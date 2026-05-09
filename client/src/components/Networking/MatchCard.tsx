import { UserPlus, Sparkles } from 'lucide-react';
import type { Match } from '../../types';

interface Props {
  match: Match;
  onRequestMeet: (matchedUserId: string) => void;
}

export default function MatchCard({ match, onRequestMeet }: Props) {
  const scorePercent = Math.round(match.score * 100);

  return (
    <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {match.matchedUserName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{match.matchedUserName}</h4>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3 h-3" /> {scorePercent}% match
            </span>
          </div>

          {/* Shared interests */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {match.sharedInterests.map(interest => (
              <span key={interest} className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs">
                {interest}
              </span>
            ))}
          </div>

          {/* Action */}
          <button
            onClick={() => onRequestMeet(match.matchedUserId)}
            disabled={match.status === 'requested'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              match.status === 'requested'
                ? 'bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            {match.status === 'requested' ? 'Request Sent' : 'Request Meet'}
          </button>
        </div>
      </div>
    </div>
  );
}
