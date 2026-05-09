# ─── Stage 1: Build React Client ─────────────────────────────────────────
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ─── Stage 2: Build Node Server ──────────────────────────────────────────
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npx tsc

# ─── Stage 3: Production ─────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Install nginx for serving static files
RUN apk add --no-cache nginx

# Copy built client
COPY --from=client-builder /app/client/dist /usr/share/nginx/html

# Copy built server
COPY --from=server-builder /app/server/dist /app/server/dist
COPY --from=server-builder /app/server/package*.json /app/server/
WORKDIR /app/server
RUN npm ci --production

# Nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Start script
COPY <<EOF /app/start.sh
#!/bin/sh
nginx
cd /app/server && node dist/index.js
EOF
RUN chmod +x /app/start.sh

EXPOSE 80 3001

CMD ["/app/start.sh"]
