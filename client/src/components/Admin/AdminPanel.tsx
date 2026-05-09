import { useState } from 'react';
import { Shield, Plus, Trash2, Edit, Download, Megaphone, Users, AlertTriangle } from 'lucide-react';
import type { Session, Track } from '../../types';
import SessionManager from './SessionManager';

interface Props {
  sessions: Session[];
  onAddSession: (session: Partial<Session>) => void;
  onUpdateSession: (id: string, data: Partial<Session>) => void;
  onDeleteSession: (id: string) => void;
  onBroadcast: (message: string, type: string) => void;
}

export default function AdminPanel({ sessions, onAddSession, onUpdateSession, onDeleteSession, onBroadcast }: Props) {
  const [activeTab, setActiveTab] = useState<'sessions' | 'announcements' | 'stats'>('sessions');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastType, setBroadcastType] = useState('announcement');

  const handleBroadcast = () => {
    if (!broadcastMsg.trim()) return;
    onBroadcast(broadcastMsg.trim(), broadcastType);
    setBroadcastMsg('');
  };

  const exportCSV = () => {
    const headers = 'Title,Speaker,Track,Room,Day,Attendees,Rating\n';
    const rows = sessions.map(s => `"${s.title}","${s.speaker}","${s.track}","${s.room}",${s.day},${s.attendeeCount},${s.rating}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'eventpulse-sessions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-amber-500/20">
          <Shield className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Panel</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage sessions, announcements & data</p>
        </div>
        <button onClick={exportCSV} className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 transition">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['sessions', 'announcements', 'stats'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500/50'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Session management */}
      {activeTab === 'sessions' && (
        <SessionManager sessions={sessions} onAdd={onAddSession} onUpdate={onUpdateSession} onDelete={onDeleteSession} />
      )}

      {/* Announcements */}
      {activeTab === 'announcements' && (
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Megaphone className="w-5 h-5 text-indigo-500" /> Broadcast Announcement</h3>
          <div className="space-y-3">
            <select value={broadcastType} onChange={e => setBroadcastType(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-sm text-slate-800 dark:text-white border border-transparent focus:ring-2 focus:ring-indigo-500">
              <option value="announcement">📢 Announcement</option>
              <option value="schedule_change">⚠️ Schedule Change</option>
              <option value="emergency">🚨 Emergency</option>
            </select>
            <textarea value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)} placeholder="Type your announcement..." rows={3} className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent resize-none" />
            <button onClick={handleBroadcast} disabled={!broadcastMsg.trim()} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition">
              Send to All Attendees
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Sessions</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{sessions.length}</p>
          </div>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Attendees</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{sessions.reduce((a, s) => a + s.attendeeCount, 0)}</p>
          </div>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Avg Rating</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{(sessions.reduce((a, s) => a + s.rating, 0) / sessions.length).toFixed(1)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
