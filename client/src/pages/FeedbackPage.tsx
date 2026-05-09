import { useState } from 'react';
import { Star } from 'lucide-react';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import { MOCK_SESSIONS, MOCK_FEEDBACK } from '../hooks/mockData';
import type { Feedback } from '../types';

export default function FeedbackPage() {
  const [selectedSession, setSelectedSession] = useState(MOCK_SESSIONS[0]?.id || '');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACK);

  const sessionFeedback = feedbacks.filter(f => f.sessionId === selectedSession);
  const avgRating = sessionFeedback.length > 0
    ? (sessionFeedback.reduce((a, f) => a + f.stars, 0) / sessionFeedback.length).toFixed(1)
    : '—';

  const handleSubmit = (data: { stars: number; comment: string }) => {
    const newF: Feedback = {
      id: `f-${Date.now()}`, sessionId: selectedSession, userId: 'demo-user-1',
      userName: 'Alex Demo', stars: data.stars, comment: data.comment, timestamp: new Date().toISOString(),
    };
    setFeedbacks(prev => [newF, ...prev]);
  };

  const selectedSessionData = MOCK_SESSIONS.find(s => s.id === selectedSession);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-amber-500/20">
          <Star className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Session Feedback</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Rate sessions and help improve the event</p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={selectedSession}
          onChange={e => setSelectedSession(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-lg bg-white dark:bg-white/5 text-sm text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500"
          aria-label="Select session for feedback"
        >
          {MOCK_SESSIONS.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {selectedSessionData && <FeedbackForm sessionId={selectedSession} sessionTitle={selectedSessionData.title} onSubmit={handleSubmit} />}
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{avgRating}</div>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{sessionFeedback.length} reviews</p>
              </div>
            </div>
          </div>

          {/* Recent feedback */}
          <div className="space-y-3">
            {sessionFeedback.map(f => (
              <div key={f.id} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{f.userName.charAt(0)}</div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{f.userName}</span>
                  <div className="flex gap-0.5 ml-auto">
                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= f.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />)}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{f.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
