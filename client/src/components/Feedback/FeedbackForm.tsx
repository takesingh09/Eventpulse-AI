import { useState } from 'react';
import { Star, Send, AlertCircle } from 'lucide-react';

interface Props {
  sessionId: string;
  sessionTitle: string;
  onSubmit: (data: { stars: number; comment: string }) => void;
}

export default function FeedbackForm({ sessionId, sessionTitle, onSubmit }: Props) {
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stars === 0) { setError('Please select a rating'); return; }
    if (comment.trim().length < 5) { setError('Comment must be at least 5 characters'); return; }
    setError('');
    onSubmit({ stars, comment: comment.trim() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-white/5 rounded-xl border border-emerald-300 dark:border-emerald-800/30 p-6 text-center animate-fade-in">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
          <Star className="w-6 h-6 text-emerald-500 fill-emerald-500" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Thank you!</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Your feedback for "{sessionTitle}" has been submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{sessionTitle}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Share your feedback</p>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            type="button"
            onClick={() => setStars(i)}
            onMouseEnter={() => setHoveredStar(i)}
            onMouseLeave={() => setHoveredStar(0)}
            className="p-1 transition-transform hover:scale-125"
            aria-label={`${i} star${i > 1 ? 's' : ''}`}
          >
            <Star className={`w-7 h-7 transition ${
              i <= (hoveredStar || stars)
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-300 dark:text-slate-600'
            }`} />
          </button>
        ))}
        {stars > 0 && <span className="text-sm text-slate-500 ml-2">{stars}/5</span>}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={e => { setComment(e.target.value); setError(''); }}
        placeholder="What did you think? Any suggestions?"
        rows={3}
        maxLength={500}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent resize-none transition mb-1"
        aria-label="Feedback comment"
      />
      <p className="text-xs text-slate-400 mb-3">{comment.length}/500</p>

      {error && (
        <p className="mb-3 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}

      <button type="submit" className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
        <Send className="w-4 h-4" /> Submit Feedback
      </button>
    </form>
  );
}
