import type { Match, User } from '../types';

/**
 * Calculate the Jaccard similarity coefficient between two sets of interests.
 * Returns a score between 0 and 1.
 */
export function jaccardSimilarity(setA: string[], setB: string[]): number {
  if (setA.length === 0 && setB.length === 0) return 0;

  const a = new Set(setA.map(s => s.toLowerCase()));
  const b = new Set(setB.map(s => s.toLowerCase()));

  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection++;
  }

  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Find the shared interests between two arrays.
 */
export function getSharedInterests(interestsA: string[], interestsB: string[]): string[] {
  const setB = new Set(interestsB.map(s => s.toLowerCase()));
  return interestsA.filter(i => setB.has(i.toLowerCase()));
}

/**
 * Calculate a weighted matchmaking score.
 * Jaccard similarity × 0.7 + shared count bonus × 0.3
 */
export function calculateMatchScore(interestsA: string[], interestsB: string[]): number {
  const jaccard = jaccardSimilarity(interestsA, interestsB);
  const shared = getSharedInterests(interestsA, interestsB).length;
  const countBonus = Math.min(shared / 5, 1); // Cap at 5 shared interests
  return jaccard * 0.7 + countBonus * 0.3;
}

/**
 * Find the top N matched users for a given user from a list of all users.
 */
export function findTopMatches(
  currentUser: User,
  allUsers: User[],
  topN: number = 5,
): Match[] {
  const candidates = allUsers.filter(u => u.uid !== currentUser.uid);

  const matches: Match[] = candidates
    .map(candidate => ({
      userId: currentUser.uid,
      matchedUserId: candidate.uid,
      matchedUserName: candidate.name,
      matchedUserPhoto: candidate.photoURL,
      matchedUserInterests: candidate.interests,
      score: calculateMatchScore(currentUser.interests, candidate.interests),
      sharedInterests: getSharedInterests(currentUser.interests, candidate.interests),
      status: 'suggested' as const,
    }))
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return matches;
}
