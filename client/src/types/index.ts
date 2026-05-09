// ─── Session ────────────────────────────────────────────────────────────────
export interface Session {
  id: string;
  title: string;
  speaker: string;
  speakerBio?: string;
  room: string;
  startTime: string;
  endTime: string;
  track: Track;
  description: string;
  rating: number;
  ratingCount: number;
  status: SessionStatus;
  day: number;
  attendeeCount: number;
}

export type Track = 'AI/ML' | 'Web Dev' | 'Cloud' | 'Mobile' | 'Startup';
export type SessionStatus = 'scheduled' | 'live' | 'completed' | 'cancelled' | 'delayed';

// ─── User ───────────────────────────────────────────────────────────────────
export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  interests: string[];
  savedSessions: string[];
  language: SupportedLanguage;
  isAdmin: boolean;
}

export type SupportedLanguage = 'en' | 'hi' | 'es' | 'fr' | 'ar';

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
};

// ─── Question ───────────────────────────────────────────────────────────────
export interface Question {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  text: string;
  upvotes: number;
  upvotedBy: string[];
  answered: boolean;
  answer?: string;
  timestamp: string;
}

// ─── Notification ───────────────────────────────────────────────────────────
export interface AppNotification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  readBy: string[];
  sessionId?: string;
}

export type NotificationType = 'schedule_change' | 'announcement' | 'reminder' | 'emergency';

// ─── Feedback ───────────────────────────────────────────────────────────────
export interface Feedback {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  stars: number;
  comment: string;
  timestamp: string;
}

// ─── Networking ─────────────────────────────────────────────────────────────
export interface Match {
  userId: string;
  matchedUserId: string;
  matchedUserName: string;
  matchedUserPhoto?: string;
  matchedUserInterests: string[];
  score: number;
  sharedInterests: string[];
  status: 'suggested' | 'requested' | 'accepted';
}

export const INTEREST_TAGS = [
  'Artificial Intelligence', 'Machine Learning', 'Web Development',
  'React', 'Node.js', 'Cloud Computing', 'DevOps', 'Mobile Development',
  'Flutter', 'Startup', 'Blockchain', 'Cybersecurity', 'Data Science',
  'UI/UX Design', 'Open Source', 'Python', 'Go', 'Rust',
] as const;

// ─── Chat ───────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ─── Venue ──────────────────────────────────────────────────────────────────
export interface VenueZone {
  id: string;
  name: string;
  type: ZoneType;
  lat: number;
  lng: number;
  capacity: number;
  description: string;
  directions: string;
}

export type ZoneType = 'hall' | 'workshop' | 'food' | 'registration' | 'networking' | 'restroom' | 'parking' | 'entrance';

// ─── Poll ───────────────────────────────────────────────────────────────────
export interface Poll {
  id: string;
  sessionId: string;
  question: string;
  options: PollOption[];
  active: boolean;
  timestamp: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

// ─── Toast ──────────────────────────────────────────────────────────────────
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
