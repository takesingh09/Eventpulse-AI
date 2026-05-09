import { useState, useMemo } from 'react';
import { Users, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import InterestForm from '../components/Networking/InterestForm';
import MatchCard from '../components/Networking/MatchCard';
import { findTopMatches } from '../utils/matchmaking';
import { MOCK_USERS } from '../hooks/mockData';
import type { Match } from '../types';

export default function NetworkingPage() {
  const { user, updateUser } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSaveInterests = (interests: string[]) => {
    if (!user) return;
    updateUser({ interests });
    const found = findTopMatches({ ...user, interests }, MOCK_USERS, 5);
    setMatches(found);
    setHasSearched(true);
  };

  const handleRequestMeet = (matchedUserId: string) => {
    setMatches(prev => prev.map(m =>
      m.matchedUserId === matchedUserId ? { ...m, status: 'requested' as const } : m
    ));
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-pink-500/20">
          <Users className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Networking</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Find attendees with similar interests using AI matchmaking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <InterestForm initialInterests={user?.interests || []} onSave={handleSaveInterests} />
        </div>

        <div className="lg:col-span-2">
          {hasSearched ? (
            matches.length > 0 ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Top Matches ({matches.length})</h3>
                </div>
                <div className="space-y-4">
                  {matches.map(m => (
                    <MatchCard key={m.matchedUserId} match={m} onRequestMeet={handleRequestMeet} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500">No matches found. Try selecting more interests!</p>
              </div>
            )
          ) : (
            <div className="text-center py-12 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <Sparkles className="w-12 h-12 text-indigo-300 dark:text-indigo-700 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">Select your interests and click "Find Matches"</p>
              <p className="text-xs text-slate-400 mt-1">Our AI will find the best networking connections for you</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
