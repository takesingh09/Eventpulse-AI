import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import QuestionForm from '../components/QnA/QuestionForm';
import QuestionList from '../components/QnA/QuestionList';
import { useAuth } from '../hooks/useAuth';
import { MOCK_SESSIONS, MOCK_QUESTIONS } from '../hooks/mockData';
import type { Question } from '../types';

export default function QnAPage() {
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState(MOCK_SESSIONS[0]?.id || '');
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);

  const sessionQuestions = questions.filter(q => q.sessionId === selectedSession);

  const handleSubmit = (text: string) => {
    const newQ: Question = {
      id: `q-${Date.now()}`,
      sessionId: selectedSession,
      userId: user?.uid || 'anon',
      userName: user?.name || 'Anonymous',
      text,
      upvotes: 0,
      upvotedBy: [],
      answered: false,
      timestamp: new Date().toISOString(),
    };
    setQuestions(prev => [newQ, ...prev]);
  };

  const handleUpvote = (id: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q
    ));
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-orange-500/20">
          <MessageCircle className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live Q&A</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Submit questions and vote on what matters</p>
        </div>
      </div>

      {/* Session selector */}
      <div className="mb-6">
        <label htmlFor="session-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Session</label>
        <select
          id="session-select"
          value={selectedSession}
          onChange={e => setSelectedSession(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-lg bg-white dark:bg-white/5 text-sm text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500"
        >
          {MOCK_SESSIONS.map(s => (
            <option key={s.id} value={s.id}>{s.title} — {s.speaker}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <QuestionForm sessionId={selectedSession} onSubmit={handleSubmit} disabled={!user} />
        <QuestionList questions={sessionQuestions} currentUserId={user?.uid} onUpvote={handleUpvote} isOrganizer={user?.isAdmin} />
      </div>
    </div>
  );
}
