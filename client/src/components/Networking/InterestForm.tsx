import { useState } from 'react';
import { Check, Tags } from 'lucide-react';
import { INTEREST_TAGS } from '../../types';

interface Props {
  initialInterests: string[];
  onSave: (interests: string[]) => void;
}

export default function InterestForm({ initialInterests, onSave }: Props) {
  const [selected, setSelected] = useState<string[]>(initialInterests);

  const toggle = (tag: string) => {
    setSelected(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Tags className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-slate-900 dark:text-white">Your Interests</h3>
        <span className="text-xs text-slate-400 ml-auto">{selected.length} selected</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {INTEREST_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              selected.includes(tag)
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-500/50'
            }`}
          >
            {selected.includes(tag) && <Check className="w-3 h-3" />}
            {tag}
          </button>
        ))}
      </div>
      <button
        onClick={() => onSave(selected)}
        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
      >
        Save Interests & Find Matches
      </button>
    </div>
  );
}
