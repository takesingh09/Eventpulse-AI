import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

interface Props {
  sessionId: string;
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export default function QuestionForm({ sessionId, onSubmit, disabled }: Props) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 10) {
      setError('Question must be at least 10 characters');
      return;
    }
    if (text.length > 500) {
      setError('Question must be under 500 characters');
      return;
    }
    setError('');
    onSubmit(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
      <label htmlFor={`question-${sessionId}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Ask a question
      </label>
      <div className="flex gap-2">
        <input
          id={`question-${sessionId}`}
          type="text"
          value={text}
          onChange={e => { setText(e.target.value); setError(''); }}
          placeholder="Type your question for the speaker..."
          maxLength={500}
          disabled={disabled}
          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent transition"
          aria-label="Question input"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Ask
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
      <p className="mt-1 text-xs text-slate-400">{text.length}/500</p>
    </form>
  );
}
