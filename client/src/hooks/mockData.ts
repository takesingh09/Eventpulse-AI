import type { Session, Question, AppNotification, Feedback, User } from '../types';

const DAY1 = '2026-06-15';
const DAY2 = '2026-06-16';
const DAY3 = '2026-06-17';

function dt(day: string, hour: number, min: number = 0): string {
  return `${day}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;
}

export const MOCK_SESSIONS: Session[] = [
  { id: 's1', title: 'The Future of Generative AI', speaker: 'Dr. Priya Sharma', speakerBio: 'AI Research Lead at Google DeepMind', room: 'Hall A', startTime: dt(DAY1,9,30), endTime: dt(DAY1,10,30), track: 'AI/ML', description: 'Explore the latest breakthroughs in generative AI, from foundation models to real-world applications.', rating: 4.8, ratingCount: 124, status: 'scheduled', day: 1, attendeeCount: 342 },
  { id: 's2', title: 'Building Scalable React Applications', speaker: 'Marcus Chen', speakerBio: 'Senior Frontend Engineer at Meta', room: 'Hall B', startTime: dt(DAY1,9,30), endTime: dt(DAY1,10,30), track: 'Web Dev', description: 'Deep dive into architecture patterns for React apps — server components, state management, performance.', rating: 4.5, ratingCount: 98, status: 'scheduled', day: 1, attendeeCount: 256 },
  { id: 's3', title: 'Kubernetes at Scale: Lessons from Production', speaker: 'Aisha Patel', speakerBio: 'Cloud Platform Director at Spotify', room: 'Hall A', startTime: dt(DAY1,11,0), endTime: dt(DAY1,12,0), track: 'Cloud', description: 'Real-world lessons in running thousands of Kubernetes pods in production.', rating: 4.7, ratingCount: 87, status: 'scheduled', day: 1, attendeeCount: 198 },
  { id: 's4', title: 'Cross-Platform Mobile with Flutter 4.0', speaker: 'James Okonkwo', speakerBio: 'Mobile Lead at Shopify', room: 'Workshop Zone', startTime: dt(DAY1,11,0), endTime: dt(DAY1,12,30), track: 'Mobile', description: 'Hands-on workshop building a production app with Flutter 4.0.', rating: 4.3, ratingCount: 62, status: 'scheduled', day: 1, attendeeCount: 85 },
  { id: 's5', title: 'From Zero to Funded: Startup Pitch Masterclass', speaker: 'Lisa Wang', speakerBio: 'Partner at Sequoia Capital', room: 'Networking Lounge', startTime: dt(DAY1,14,0), endTime: dt(DAY1,15,30), track: 'Startup', description: 'Learn the art of the perfect pitch with live demos and investor Q&A.', rating: 4.9, ratingCount: 156, status: 'scheduled', day: 1, attendeeCount: 289 },
  { id: 's6', title: 'LLM Fine-tuning Workshop', speaker: 'Dr. Priya Sharma', speakerBio: 'AI Research Lead at Google DeepMind', room: 'Workshop Zone', startTime: dt(DAY1,14,0), endTime: dt(DAY1,16,0), track: 'AI/ML', description: 'Hands-on workshop on fine-tuning open-source LLMs with LoRA and PEFT.', rating: 4.6, ratingCount: 73, status: 'scheduled', day: 1, attendeeCount: 78 },
  { id: 's7', title: 'Next.js 16 and the Future of Web', speaker: 'Sarah Johnson', speakerBio: 'Core Team at Vercel', room: 'Hall B', startTime: dt(DAY2,9,30), endTime: dt(DAY2,10,30), track: 'Web Dev', description: 'First look at Next.js 16: partial prerendering, React Server Actions at scale.', rating: 4.7, ratingCount: 201, status: 'scheduled', day: 2, attendeeCount: 412 },
  { id: 's8', title: 'Securing Cloud-Native Applications', speaker: 'Raj Mehta', speakerBio: 'Security Architect at AWS', room: 'Hall A', startTime: dt(DAY2,9,30), endTime: dt(DAY2,10,30), track: 'Cloud', description: 'Defense-in-depth strategies for cloud-native apps.', rating: 4.4, ratingCount: 55, status: 'scheduled', day: 2, attendeeCount: 167 },
  { id: 's9', title: 'Building AI Agents That Actually Work', speaker: 'Emily Rodriguez', speakerBio: 'Founding Engineer at Anthropic', room: 'Hall A', startTime: dt(DAY2,11,0), endTime: dt(DAY2,12,0), track: 'AI/ML', description: 'Practical patterns for building reliable AI agents.', rating: 4.9, ratingCount: 178, status: 'scheduled', day: 2, attendeeCount: 356 },
  { id: 's10', title: 'React Native vs Flutter: 2026 Showdown', speaker: 'James Okonkwo', speakerBio: 'Mobile Lead at Shopify', room: 'Hall B', startTime: dt(DAY2,14,0), endTime: dt(DAY2,15,0), track: 'Mobile', description: 'An honest comparison of the two leading cross-platform frameworks.', rating: 4.2, ratingCount: 89, status: 'scheduled', day: 2, attendeeCount: 234 },
  { id: 's11', title: 'Venture Capital Panel: What We Fund in 2026', speaker: 'Lisa Wang', speakerBio: 'Partner at Sequoia Capital', room: 'Networking Lounge', startTime: dt(DAY2,14,0), endTime: dt(DAY2,15,30), track: 'Startup', description: 'Panel discussion with VCs on investment theses and market trends.', rating: 4.8, ratingCount: 134, status: 'scheduled', day: 2, attendeeCount: 312 },
  { id: 's12', title: 'Edge Computing and WebAssembly', speaker: 'Aisha Patel', speakerBio: 'Cloud Platform Director at Spotify', room: 'Hall A', startTime: dt(DAY3,9,30), endTime: dt(DAY3,10,30), track: 'Cloud', description: 'How edge computing and WASM are reshaping deployment.', rating: 4.5, ratingCount: 67, status: 'scheduled', day: 3, attendeeCount: 189 },
  { id: 's13', title: 'Design Systems That Scale', speaker: 'Marcus Chen', speakerBio: 'Senior Frontend Engineer at Meta', room: 'Hall B', startTime: dt(DAY3,9,30), endTime: dt(DAY3,10,30), track: 'Web Dev', description: 'Building and maintaining design systems across large organizations.', rating: 4.4, ratingCount: 43, status: 'scheduled', day: 3, attendeeCount: 145 },
  { id: 's14', title: 'Responsible AI: Ethics, Bias, and Governance', speaker: 'Emily Rodriguez', speakerBio: 'Founding Engineer at Anthropic', room: 'Hall A', startTime: dt(DAY3,11,0), endTime: dt(DAY3,12,0), track: 'AI/ML', description: 'Frameworks for developing AI responsibly — bias detection, red-teaming, compliance.', rating: 4.6, ratingCount: 91, status: 'scheduled', day: 3, attendeeCount: 267 },
  { id: 's15', title: 'Closing Keynote: Tech in 2030', speaker: 'Dr. Priya Sharma', speakerBio: 'AI Research Lead at Google DeepMind', room: 'Hall A', startTime: dt(DAY3,14,0), endTime: dt(DAY3,15,30), track: 'AI/ML', description: 'A visionary keynote on where technology is headed — AGI, quantum, BCIs.', rating: 4.9, ratingCount: 210, status: 'scheduled', day: 3, attendeeCount: 498 },
];

export const MOCK_QUESTIONS: Question[] = [
  { id: 'q1', sessionId: 's1', userId: 'u2', userName: 'Rahul Gupta', text: 'How do you see generative AI impacting education in the next 5 years?', upvotes: 24, upvotedBy: [], answered: false, timestamp: dt(DAY1,10,5) },
  { id: 'q2', sessionId: 's1', userId: 'u3', userName: 'Sophie Martin', text: 'What are the key architectural differences between GPT-5 and Gemini 2.0?', upvotes: 18, upvotedBy: [], answered: true, answer: 'Great question! The key differences lie in the multimodal architecture...', timestamp: dt(DAY1,10,8) },
  { id: 'q3', sessionId: 's2', userId: 'u4', userName: 'Wei Zhang', text: 'Do you recommend server components for apps with heavy client-side interactivity?', upvotes: 12, upvotedBy: [], answered: false, timestamp: dt(DAY1,10,15) },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', message: '🎉 Welcome to TechVerse 2026! Check out the schedule.', type: 'announcement', timestamp: dt(DAY1,8,0), readBy: [] },
  { id: 'n2', message: '⚠️ Session "Kubernetes at Scale" moved to Hall B due to overflow.', type: 'schedule_change', timestamp: dt(DAY1,10,45), readBy: [], sessionId: 's3' },
  { id: 'n3', message: '🔔 Your session "LLM Fine-tuning Workshop" starts in 15 minutes!', type: 'reminder', timestamp: dt(DAY1,13,45), readBy: [], sessionId: 's6' },
  { id: 'n4', message: '📢 Networking mixer tonight at 6 PM in the Lounge!', type: 'announcement', timestamp: dt(DAY1,16,0), readBy: [] },
  { id: 'n5', message: '🚨 Fire drill at 3 PM today. Please follow venue staff instructions.', type: 'emergency', timestamp: dt(DAY2,12,0), readBy: [] },
];

export const MOCK_FEEDBACK: Feedback[] = [
  { id: 'f1', sessionId: 's1', userId: 'u2', userName: 'Rahul Gupta', stars: 5, comment: 'Mind-blowing keynote! Best session so far.', timestamp: dt(DAY1,10,35) },
  { id: 'f2', sessionId: 's1', userId: 'u3', userName: 'Sophie Martin', stars: 4, comment: 'Great content, could use more live demos.', timestamp: dt(DAY1,10,40) },
  { id: 'f3', sessionId: 's2', userId: 'u4', userName: 'Wei Zhang', stars: 5, comment: 'Exactly what I needed for my current project.', timestamp: dt(DAY1,10,45) },
  { id: 'f4', sessionId: 's5', userId: 'u2', userName: 'Rahul Gupta', stars: 5, comment: 'Lisa is an incredible speaker. Very actionable advice.', timestamp: dt(DAY1,15,35) },
];

export const MOCK_USERS: User[] = [
  { uid: 'u2', name: 'Rahul Gupta', email: 'rahul@example.com', interests: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Data Science'], savedSessions: ['s1','s6'], language: 'en', isAdmin: false },
  { uid: 'u3', name: 'Sophie Martin', email: 'sophie@example.com', interests: ['Web Development', 'React', 'UI/UX Design', 'Open Source'], savedSessions: ['s2','s7'], language: 'fr', isAdmin: false },
  { uid: 'u4', name: 'Wei Zhang', email: 'wei@example.com', interests: ['Cloud Computing', 'DevOps', 'Go', 'Rust'], savedSessions: ['s3','s8'], language: 'en', isAdmin: false },
  { uid: 'u5', name: 'Fatima Al-Rashid', email: 'fatima@example.com', interests: ['Startup', 'Artificial Intelligence', 'Mobile Development', 'Flutter'], savedSessions: ['s4','s5'], language: 'ar', isAdmin: false },
  { uid: 'u6', name: 'Carlos Rivera', email: 'carlos@example.com', interests: ['Web Development', 'Node.js', 'Cloud Computing', 'Cybersecurity'], savedSessions: ['s7','s8'], language: 'es', isAdmin: false },
  { uid: 'u7', name: 'Yuki Tanaka', email: 'yuki@example.com', interests: ['Machine Learning', 'Python', 'Data Science', 'Blockchain'], savedSessions: ['s1','s9'], language: 'en', isAdmin: false },
  { uid: 'u8', name: 'Anna Kowalski', email: 'anna@example.com', interests: ['React', 'UI/UX Design', 'Mobile Development', 'Open Source'], savedSessions: ['s2','s10'], language: 'en', isAdmin: false },
];
