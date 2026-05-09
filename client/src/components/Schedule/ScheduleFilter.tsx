import { Search, Filter } from 'lucide-react';
import type { Track } from '../../types';

const TRACKS: (Track | 'All')[] = ['All', 'AI/ML', 'Web Dev', 'Cloud', 'Mobile', 'Startup'];
const DAYS = [1, 2, 3];

interface Props {
  selectedTrack: Track | 'All';
  selectedDay: number;
  searchQuery: string;
  onTrackChange: (track: Track | 'All') => void;
  onDayChange: (day: number) => void;
  onSearchChange: (query: string) => void;
}

export default function ScheduleFilter({ selectedTrack, selectedDay, searchQuery, onTrackChange, onDayChange, onSearchChange }: Props) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 mb-6 space-y-4">
      {/* Day tabs */}
      <div className="flex gap-2">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedDay === day
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* Search + Track filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search sessions, speakers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-500 transition"
            aria-label="Search sessions"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          {TRACKS.map(track => (
            <button
              key={track}
              onClick={() => onTrackChange(track)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTrack === track
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
