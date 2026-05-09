import { describe, it, expect } from 'vitest';
import { jaccardSimilarity, getSharedInterests, calculateMatchScore, findTopMatches } from '../utils/matchmaking';
import type { User } from '../types';

describe('jaccardSimilarity', () => {
  it('returns 1 for identical sets', () => {
    expect(jaccardSimilarity(['AI', 'Web'], ['AI', 'Web'])).toBe(1);
  });

  it('returns 0 for completely different sets', () => {
    expect(jaccardSimilarity(['AI', 'ML'], ['Web', 'Mobile'])).toBe(0);
  });

  it('returns 0 for two empty sets', () => {
    expect(jaccardSimilarity([], [])).toBe(0);
  });

  it('calculates correct similarity for overlapping sets', () => {
    // Intersection: {AI} = 1, Union: {AI, ML, Web} = 3
    expect(jaccardSimilarity(['AI', 'ML'], ['AI', 'Web'])).toBeCloseTo(1 / 3);
  });

  it('is case-insensitive', () => {
    expect(jaccardSimilarity(['ai', 'ml'], ['AI', 'ML'])).toBe(1);
  });
});

describe('getSharedInterests', () => {
  it('returns shared interests', () => {
    const shared = getSharedInterests(['AI', 'Web', 'Cloud'], ['Web', 'Cloud', 'Mobile']);
    expect(shared).toEqual(['Web', 'Cloud']);
  });

  it('returns empty array when no overlap', () => {
    expect(getSharedInterests(['AI'], ['Web'])).toEqual([]);
  });
});

describe('calculateMatchScore', () => {
  it('returns 0 for no shared interests', () => {
    expect(calculateMatchScore(['AI'], ['Web'])).toBe(0);
  });

  it('returns higher score for more overlap', () => {
    const scoreA = calculateMatchScore(['AI'], ['AI', 'Web']);
    const scoreB = calculateMatchScore(['AI', 'Web'], ['AI', 'Web']);
    expect(scoreB).toBeGreaterThan(scoreA);
  });

  it('maxes count bonus at 5 shared interests', () => {
    const interests = ['A', 'B', 'C', 'D', 'E', 'F'];
    const score = calculateMatchScore(interests, interests);
    expect(score).toBe(1); // Jaccard=1×0.7 + min(6/5,1)×0.3 = 0.7+0.3 = 1
  });
});

describe('findTopMatches', () => {
  const mockUsers: User[] = [
    { uid: 'u1', name: 'User1', email: '', interests: ['AI', 'ML', 'Web'], savedSessions: [], language: 'en', isAdmin: false },
    { uid: 'u2', name: 'User2', email: '', interests: ['AI', 'ML'], savedSessions: [], language: 'en', isAdmin: false },
    { uid: 'u3', name: 'User3', email: '', interests: ['Mobile', 'Flutter'], savedSessions: [], language: 'en', isAdmin: false },
    { uid: 'u4', name: 'User4', email: '', interests: ['AI'], savedSessions: [], language: 'en', isAdmin: false },
  ];

  const currentUser: User = { uid: 'me', name: 'Me', email: '', interests: ['AI', 'ML'], savedSessions: [], language: 'en', isAdmin: false };

  it('excludes current user from matches', () => {
    const matches = findTopMatches(currentUser, [...mockUsers, currentUser]);
    expect(matches.find(m => m.matchedUserId === 'me')).toBeUndefined();
  });

  it('returns top N matches sorted by score', () => {
    const matches = findTopMatches(currentUser, mockUsers, 2);
    expect(matches.length).toBe(2);
    expect(matches[0].score).toBeGreaterThanOrEqual(matches[1].score);
  });

  it('excludes zero-score matches', () => {
    const matches = findTopMatches(currentUser, mockUsers);
    matches.forEach(m => expect(m.score).toBeGreaterThan(0));
  });

  it('includes shared interests in match', () => {
    const matches = findTopMatches(currentUser, mockUsers);
    const userMatch = matches.find(m => m.matchedUserId === 'u2');
    expect(userMatch?.sharedInterests).toContain('AI');
    expect(userMatch?.sharedInterests).toContain('ML');
  });
});
