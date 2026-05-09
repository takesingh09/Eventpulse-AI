import { describe, it, expect } from 'vitest';
import { buildContextString } from '../services/gemini';
import type { Session } from '../types';

const MOCK_SESSIONS: Session[] = [
  {
    id: 's1', title: 'AI Session', speaker: 'Dr. Smith', room: 'Hall A',
    startTime: '2026-06-15T09:30:00', endTime: '2026-06-15T10:30:00',
    track: 'AI/ML', description: 'AI talk', rating: 4.5, ratingCount: 10,
    status: 'scheduled', day: 1, attendeeCount: 100,
  },
  {
    id: 's2', title: 'Web Dev Session', speaker: 'Jane Doe', room: 'Hall B',
    startTime: '2026-06-15T11:00:00', endTime: '2026-06-15T12:00:00',
    track: 'Web Dev', description: 'Web talk', rating: 4.0, ratingCount: 5,
    status: 'scheduled', day: 1, attendeeCount: 50,
  },
  {
    id: 's3', title: 'Cloud Session', speaker: 'Bob Lee', room: 'Hall A',
    startTime: '2026-06-15T14:00:00', endTime: '2026-06-15T15:00:00',
    track: 'Cloud', description: 'Cloud talk', rating: 4.2, ratingCount: 8,
    status: 'scheduled', day: 1, attendeeCount: 75,
  },
];

describe('buildContextString', () => {
  it('includes current time', () => {
    const ctx = buildContextString(MOCK_SESSIONS, []);
    expect(ctx).toContain('Current time:');
  });

  it('includes saved sessions when provided', () => {
    const ctx = buildContextString(MOCK_SESSIONS, ['s1']);
    expect(ctx).toContain("User's saved sessions");
    expect(ctx).toContain('AI Session');
    expect(ctx).toContain('Dr. Smith');
    expect(ctx).toContain('Hall A');
  });

  it('does not include saved section when no saved sessions', () => {
    const ctx = buildContextString(MOCK_SESSIONS, []);
    expect(ctx).not.toContain("User's saved sessions");
  });

  it('includes upcoming sessions', () => {
    const ctx = buildContextString(MOCK_SESSIONS, []);
    expect(ctx).toContain('Upcoming sessions');
  });

  it('limits upcoming to 5 sessions', () => {
    const manySessions = Array.from({ length: 10 }, (_, i) => ({
      ...MOCK_SESSIONS[0],
      id: `s${i}`,
      title: `Session ${i}`,
      startTime: `2099-06-15T${String(9 + i).padStart(2, '0')}:00:00`,
    }));
    const ctx = buildContextString(manySessions, []);
    const matches = ctx.match(/Session \d/g);
    expect(matches?.length).toBeLessThanOrEqual(5);
  });
});
