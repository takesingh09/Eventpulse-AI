import { Star, Clock, MapPin, Users, CalendarPlus, Bookmark, BookmarkCheck, AlertTriangle, Radio } from 'lucide-react';
import type { Session } from '../../types';
import { formatTime, formatDuration, isSessionLive } from '../../utils/dateFormatter';
import { addToGoogleCalendar } from '../../services/googleCalendar';

const TRACK_COLORS: Record<string, string> = {
  'AI/ML': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Web Dev': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Cloud': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Mobile': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Startup': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

interface Props {
  session: Session;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  compact?: boolean;
}

export default function SessionCard({ session, isSaved = false, onToggleSave, compact = false }: Props) {
  const live = isSessionLive(session.startTime, session.endTime);
  const trackStyle = TRACK_COLORS[session.track] || 'bg-slate-500/20 text-slate-400';

  return (
    <div className={`group relative bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 hover:scale-[1.02] ${compact ? 'p-3' : 'p-5'}`}>
      {/* Status badges */}
      <div className="flex items-center gap-2 mb-3">
        {live && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium animate-pulse">
            <Radio className="w-3 h-3" /> LIVE
          </span>
        )}
        {session.status === 'cancelled' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
            <AlertTriangle className="w-3 h-3" /> Cancelled
          </span>
        )}
        {session.status === 'delayed' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
            <Clock className="w-3 h-3" /> Delayed
          </span>
        )}
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${trackStyle}`}>
          {session.track}
        </span>
      </div>

      {/* Title & Speaker */}
      <h3 className={`font-semibold text-slate-900 dark:text-white ${compact ? 'text-sm' : 'text-base'} mb-1 line-clamp-2`}>
        {session.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{session.speaker}</p>

      {/* Meta */}
      {!compact && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{session.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatTime(session.startTime)} · {formatDuration(session.startTime, session.endTime)}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{session.room}</span>
        <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{session.attendeeCount}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(session.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
        ))}
        <span className="text-xs text-slate-500 ml-1">{session.rating.toFixed(1)} ({session.ratingCount})</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => addToGoogleCalendar(session)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          aria-label={`Add ${session.title} to Google Calendar`}
        >
          <CalendarPlus className="w-3.5 h-3.5" /> Add to Calendar
        </button>
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(session.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              isSaved
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:border-indigo-500/50'
            }`}
            aria-label={isSaved ? 'Remove from My Schedule' : 'Save to My Schedule'}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            {isSaved ? 'Saved' : 'Save'}
          </button>
        )}
      </div>
    </div>
  );
}
