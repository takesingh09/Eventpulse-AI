import { Request, Response, NextFunction } from 'express';

// Simplified auth middleware — in production, verify Firebase ID tokens
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Allow unauthenticated access in demo mode
    (req as any).userId = 'anonymous';
    next();
    return;
  }

  // In production: use firebase-admin to verify the token
  // const token = authHeader.split(' ')[1];
  // const decoded = await admin.auth().verifyIdToken(token);
  // req.userId = decoded.uid;

  (req as any).userId = 'authenticated-user';
  next();
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction): void {
  // In production: check custom claims or Firestore user doc
  const isAdmin = (req as any).isAdmin === true;

  if (!isAdmin) {
    // Allow in demo mode
    next();
    return;
  }

  next();
}
