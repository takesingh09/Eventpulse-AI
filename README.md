# EventPulse AI — Smart Physical Event Companion

> 🧠 AI-powered companion app for physical tech events. Built with React, Node.js, Google Gemini, Firebase, and Google Maps.

## Chosen Vertical

**Physical Event Experience** — Enhancing how attendees, organizers, and speakers navigate, engage with, and get the most out of physical tech conferences.

## Project Overview

EventPulse AI is a full-stack web application designed to revolutionize the physical event experience. It serves as an intelligent companion for attendees at tech conferences, providing AI-powered assistance, real-time schedule management, interactive venue navigation, networking matchmaking, and live Q&A features — all in a beautifully designed, mobile-first interface.

The app leverages Google's ecosystem extensively — Gemini AI for intelligent conversations, Google Maps for venue navigation, Firebase for real-time data synchronization and authentication, and Google Calendar for seamless schedule integration. Whether you're an attendee looking for the next session, a speaker wanting to engage with your audience, or an organizer managing the event, EventPulse AI has you covered.

## Features

- ✨ **AI Event Assistant** — Gemini-powered chatbot that knows the event schedule, venue layout, and your personal agenda
- 📅 **Smart Schedule Manager** — Filterable agenda with personalized saved sessions and one-click Google Calendar integration
- 🗺️ **Interactive Venue Map** — SVG floor plan with clickable zones, directions, and nearby facility finder
- ❓ **Live Q&A & Polling** — Real-time question submission, upvoting, and AI moderation for session Q&A
- 🤝 **Networking Matchmaker** — AI-powered interest matching with Jaccard similarity algorithm
- 🔔 **Event Notifications Hub** — Real-time in-app notifications for schedule changes, announcements, and reminders
- 🌍 **Multi-language Support** — 5 languages (English, Hindi, Spanish, French, Arabic) via Google Translate
- ⭐ **Feedback & Rating System** — Star ratings, comments, and AI-powered feedback trend summaries
- 🛡️ **Organizer Admin Panel** — Session management, emergency broadcasts, attendance analytics, and CSV export
- 📱 **Responsive & Accessible UI** — Mobile-first with dark/light mode, WCAG 2.1 AA compliant

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js + Express |
| AI | Google Gemini API (gemini-1.5-flash) |
| Maps | Google Maps JavaScript API + Places API |
| Auth | Firebase Authentication (Google Sign-In) |
| Database | Firebase Firestore (real-time sync) |
| Icons | Lucide React |
| Charts | Recharts |
| Testing | Vitest |
| Deployment | Docker + Google Cloud Run |
| CI/CD | GitHub Actions |

## Google Services Used

| Service | Usage |
|---|---|
| **Google Gemini AI** | Powers the AI assistant chatbot, question moderation, and feedback summarization |
| **Google Maps + Places** | Interactive venue map with custom markers and nearby facility search |
| **Firebase Authentication** | Google Sign-In for user authentication and session management |
| **Firebase Firestore** | Real-time database for sessions, users, questions, notifications, and feedback |
| **Google Calendar API** | One-click "Add to Calendar" for saved sessions via calendar URL builder |
| **Google Translate** | Multi-language support using Gemini as translation fallback |

## Approach and Logic

### AI Decision-Making
The Gemini-powered assistant uses a rich system prompt containing the complete event schedule, venue map data, and user context. Each message includes the user's saved sessions and current time, enabling context-aware responses like "Your next session starts in 15 minutes in Hall A."

### Real-Time Sync
Firebase Firestore `onSnapshot` listeners power real-time updates across the app — new questions appear instantly, schedule changes propagate to all clients, and notifications arrive in real-time without polling.

### Matchmaking Algorithm
The networking feature uses a **weighted Jaccard similarity** algorithm:
- **Jaccard coefficient** (70% weight): Measures set intersection over union of interest tags
- **Count bonus** (30% weight): Rewards more shared interests (capped at 5)
- Results sorted by score, top 5 displayed

### Demo Mode
The app runs fully without API keys using built-in mock data, making it instantly runnable for evaluation.

## How the Solution Works

```
1. Login → Sign in with Google (or use demo mode)
2. Browse Schedule → Filter 15 sessions across 5 tracks and 3 days
3. Save Sessions → Build personal agenda with one-click save
4. Chat with AI → Ask "What's next?" or "Where is Hall B?"
5. Add to Calendar → One-click Google Calendar integration
6. Navigate Venue → Interactive SVG map with zone directions
7. Ask Questions → Submit and upvote Q&A for live sessions
8. Network → Select interests, get AI-matched connections
9. Give Feedback → Rate sessions with stars and comments
10. Stay Updated → Real-time notifications for changes
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                     │
│  (Vite + TypeScript + Tailwind CSS v4)              │
│                                                      │
│  Pages: Home | Schedule | Map | Q&A | Network       │
│         Feedback | Notifications | Admin            │
│                                                      │
│  Components: ChatWidget | SessionCard | VenueMap    │
│              MatchCard | FeedbackForm | AdminPanel  │
│                                                      │
│  Services: firebase.ts | gemini.ts | translate.ts   │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP / REST API
┌─────────────────────┼───────────────────────────────┐
│              Express Backend (Node.js)               │
│                                                      │
│  Routes: /api/ai/chat | /api/sessions               │
│          /api/users | /api/translate                 │
│                                                      │
│  Services: geminiService | firestoreService         │
│  Middleware: auth | errorHandler                    │
└─────────────────────┬───────────────────────────────┘
                      │
        ┌─────────────┼──────────────┐
        ▼             ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────────┐
  │ Firebase │  │ Google   │  │ Google Maps  │
  │Firestore │  │ Gemini   │  │ Places API   │
  │  + Auth  │  │ 1.5 Flash│  │              │
  └──────────┘  └──────────┘  └──────────────┘
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- (Optional) Firebase project with Firestore + Auth enabled
- (Optional) Google Gemini API key from [AI Studio](https://aistudio.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eventpulse-ai.git
cd eventpulse-ai
```

### 2. Install dependencies
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 3. Configure environment variables
```bash
# Client
cp client/.env.example client/.env
# Edit client/.env with your Firebase and Google API keys

# Server
cp server/.env.example server/.env
# Edit server/.env with your Gemini API key
```

> **Note:** The app runs in demo mode without any API keys configured. All features work with mock data.

### 4. Run development servers
```bash
# Terminal 1: Client (http://localhost:5173)
cd client
npm run dev

# Terminal 2: Server (http://localhost:3001)
cd server
npm run dev
```

### 5. Run tests
```bash
cd client
npx vitest run
```

### 6. Build for production
```bash
cd client && npm run build
cd ../server && npm run build
```

## Deployment

### Docker
```bash
# Build and run
docker-compose up --build

# Production build
docker-compose --profile production up --build
```

### Google Cloud Run
```bash
# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/eventpulse-ai

# Deploy
gcloud run deploy eventpulse-ai \
  --image gcr.io/YOUR_PROJECT_ID/eventpulse-ai \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars="GEMINI_API_KEY=your-key,SERVER_PORT=3001"
```

## Assumptions Made

- **Event format:** 3-day tech conference (TechVerse 2026) with 15 sessions across 5 tracks
- **Venue:** Pragati Maidan, New Delhi (coordinates: 28.6139, 77.2090) — configurable
- **User roles:** Attendees (default) and Admins (via `isAdmin` flag in Firestore)
- **Indoor navigation:** Text-based directions from known markers (no GPS/BLE beacons)
- **Real-time:** Firestore onSnapshot for live updates (no WebSocket server required)
- **Translation:** Uses Gemini as translation fallback when Google Translate API is not configured
- **Calendar integration:** Uses Google Calendar URL scheme (no OAuth required)
- **Mock data:** App fully functional without API keys using built-in mock data
- **Authentication:** Google Sign-In via Firebase (email/password not implemented)
- **Notifications:** In-app only (no push notifications / service workers)

## Screenshots

![Dashboard](./screenshots/dashboard.png)
![Schedule](./screenshots/schedule.png)
![AI Chat](./screenshots/chat.png)
![Map](./screenshots/map.png)
![Networking](./screenshots/networking.png)

## License

MIT License

Copyright (c) 2026 EventPulse AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
