/**
 * Firestore Seed Data Script
 * Run: npx tsx src/seedData.ts
 * 
 * This script seeds Firestore with mock data for the TechVerse 2026 conference.
 * Requires FIREBASE_PROJECT_ID environment variable and a service account key.
 */

// import * as admin from 'firebase-admin';
// const serviceAccount = require('../serviceAccountKey.json');
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// const db = admin.firestore();

const DAY1 = '2026-06-15';
const DAY2 = '2026-06-16';
const DAY3 = '2026-06-17';

const dt = (day: string, h: number, m = 0) => `${day}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;

const SESSIONS = [
  { id: 's1', title: 'The Future of Generative AI', speaker: 'Dr. Priya Sharma', room: 'Hall A', startTime: dt(DAY1, 9, 30), endTime: dt(DAY1, 10, 30), track: 'AI/ML', description: 'Explore the latest breakthroughs in generative AI.', rating: 4.8, ratingCount: 124, status: 'scheduled', day: 1, attendeeCount: 342 },
  { id: 's2', title: 'Building Scalable React Applications', speaker: 'Marcus Chen', room: 'Hall B', startTime: dt(DAY1, 9, 30), endTime: dt(DAY1, 10, 30), track: 'Web Dev', description: 'Architecture patterns for React apps.', rating: 4.5, ratingCount: 98, status: 'scheduled', day: 1, attendeeCount: 256 },
  { id: 's3', title: 'Kubernetes at Scale', speaker: 'Aisha Patel', room: 'Hall A', startTime: dt(DAY1, 11, 0), endTime: dt(DAY1, 12, 0), track: 'Cloud', description: 'Real-world lessons running K8s in production.', rating: 4.7, ratingCount: 87, status: 'scheduled', day: 1, attendeeCount: 198 },
  // ... Add remaining sessions as needed
];

const SPEAKERS = [
  { id: 'sp1', name: 'Dr. Priya Sharma', bio: 'AI Research Lead at Google DeepMind', topics: ['AI/ML'] },
  { id: 'sp2', name: 'Marcus Chen', bio: 'Senior Frontend Engineer at Meta', topics: ['Web Dev'] },
  { id: 'sp3', name: 'Aisha Patel', bio: 'Cloud Platform Director at Spotify', topics: ['Cloud'] },
  { id: 'sp4', name: 'James Okonkwo', bio: 'Mobile Lead at Shopify', topics: ['Mobile'] },
  { id: 'sp5', name: 'Lisa Wang', bio: 'Partner at Sequoia Capital', topics: ['Startup'] },
  { id: 'sp6', name: 'Sarah Johnson', bio: 'Core Team at Vercel', topics: ['Web Dev'] },
  { id: 'sp7', name: 'Raj Mehta', bio: 'Security Architect at AWS', topics: ['Cloud'] },
  { id: 'sp8', name: 'Emily Rodriguez', bio: 'Founding Engineer at Anthropic', topics: ['AI/ML'] },
];

async function seed() {
  console.log('🌱 Seeding Firestore...');
  console.log(`📋 ${SESSIONS.length} sessions ready`);
  console.log(`🎤 ${SPEAKERS.length} speakers ready`);
  console.log('');
  console.log('To seed a real Firestore database:');
  console.log('1. Download your service account key from Firebase Console');
  console.log('2. Save as server/serviceAccountKey.json');
  console.log('3. Uncomment the Firebase Admin imports in this file');
  console.log('4. Run: npx tsx src/seedData.ts');

  // Uncomment below to actually seed:
  // for (const session of SESSIONS) {
  //   await db.collection('sessions').doc(session.id).set(session);
  //   console.log(`  ✓ Session: ${session.title}`);
  // }
  // for (const speaker of SPEAKERS) {
  //   await db.collection('speakers').doc(speaker.id).set(speaker);
  //   console.log(`  ✓ Speaker: ${speaker.name}`);
  // }
  // console.log('✅ Seed complete!');
}

seed().catch(console.error);
