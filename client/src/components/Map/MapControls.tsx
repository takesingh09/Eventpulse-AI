import { Search, Locate } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
  onLocateMe: () => void;
}

export default function MapControls({ onSearch, onLocateMe }: Props) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          onChange={e => onSearch(e.target.value)}
          placeholder="Search nearby (parking, ATMs, restaurants...)"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-white/5 text-sm text-slate-800 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Search nearby places"
        />
      </div>
      <button
        onClick={onLocateMe}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
      >
        <Locate className="w-4 h-4" /> Locate Me
      </button>
    </div>
  );
}
