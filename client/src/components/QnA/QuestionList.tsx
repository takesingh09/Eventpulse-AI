import { ThumbsUp, CheckCircle2, MessageCircle } from 'lucide-react';
import type { Question } from '../../types';
import { getRelativeTime } from '../../utils/dateFormatter';

interface Props {
  questions: Question[];
  currentUserId?: string;
  onUpvote: (id: string) => void;
  isOrganizer?: boolean;
  onAnswer?: (id: string, answer: string) => void;
}

export default function QuestionList({ questions, currentUserId, onUpvote, isOrganizer, onAnswer }: Props) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400 text-sm">No questions yet</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Be the first to ask!</p>
      </div>
    );
  }

  const sorted = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-3">
      {sorted.map(q => (
        <div key={q.id} className={`p-4 rounded-xl border transition ${q.answered ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>
          <div className="flex items-start gap-3">
            <button
              onClick={() => onUpvote(q.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition ${
                q.upvotedBy?.includes(currentUserId || '')
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600'
                  : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400'
              }`}
              aria-label={`Upvote question (${q.upvotes} votes)`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-medium">{q.upvotes}</span>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-800 dark:text-slate-200">{q.text}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <span>{q.userName}</span>
                <span>·</span>
                <span>{getRelativeTime(q.timestamp)}</span>
                {q.answered && (
                  <span className="inline-flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" /> Answered
                  </span>
                )}
              </div>
              {q.answered && q.answer && (
                <div className="mt-3 pl-3 border-l-2 border-emerald-400 text-sm text-slate-600 dark:text-slate-300">
                  {q.answer}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
