import { CalendarHeart, X } from 'lucide-react';
import type { Session } from '../../types';
import { formatTime } from '../../utils/dateFormatter';

interface Props {
  sessions: Session[];
  onRemove: (id: string) => void;
}

export default function MySchedule({ sessions, onRemove }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarHeart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400 text-sm">No saved sessions yet</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Browse the schedule and save sessions you want to attend</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map(session => (
        <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 group hover:border-indigo-500/30 transition">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{session.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{formatTime(session.startTime)} · {session.room}</p>
          </div>
          <button onClick={() => onRemove(session.id)} className="p-1 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition" aria-label={`Remove ${session.title}`}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
