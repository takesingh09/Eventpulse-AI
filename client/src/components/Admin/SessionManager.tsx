import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import type { Session, Track, SessionStatus } from '../../types';

const TRACKS: Track[] = ['AI/ML', 'Web Dev', 'Cloud', 'Mobile', 'Startup'];

interface Props {
  sessions: Session[];
  onAdd: (session: Partial<Session>) => void;
  onUpdate: (id: string, data: Partial<Session>) => void;
  onDelete: (id: string) => void;
}

export default function SessionManager({ sessions, onAdd, onUpdate, onDelete }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', speaker: '', room: '', track: 'AI/ML' as Track, description: '', day: 1 });

  const handleSave = () => {
    if (!form.title || !form.speaker) return;
    if (editId) {
      onUpdate(editId, form);
      setEditId(null);
    } else {
      onAdd({ ...form, id: `new-${Date.now()}`, rating: 0, ratingCount: 0, status: 'scheduled' as SessionStatus, attendeeCount: 0, startTime: '', endTime: '' });
    }
    setForm({ title: '', speaker: '', room: '', track: 'AI/ML', description: '', day: 1 });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">Sessions ({sessions.length})</h3>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition">
          <Plus className="w-3.5 h-3.5" /> Add Session
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-white/5 rounded-xl border border-indigo-500/30 p-4 mb-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Session title *" className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-sm border border-transparent focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-white" />
            <input value={form.speaker} onChange={e => setForm(f => ({ ...f, speaker: e.target.value }))} placeholder="Speaker name *" className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-sm border border-transparent focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-white" />
            <input value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} placeholder="Room" className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-sm border border-transparent focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-white" />
            <select value={form.track} onChange={e => setForm(f => ({ ...f, track: e.target.value as Track }))} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-sm border border-transparent focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-white">
              {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" rows={2} className="w-full mt-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-sm border border-transparent focus:ring-2 focus:ring-indigo-500 resize-none text-slate-800 dark:text-white" />
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition">
              <Save className="w-3.5 h-3.5" /> {editId ? 'Update' : 'Create'}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-300 dark:hover:bg-white/15 transition">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sessions.map(s => (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 group">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{s.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.speaker} · {s.room} · Day {s.day}</p>
            </div>
            <span className="text-xs text-slate-400">{s.attendeeCount} attendees</span>
            <button onClick={() => { setEditId(s.id); setForm({ title: s.title, speaker: s.speaker, room: s.room, track: s.track, description: s.description, day: s.day }); setShowForm(true); }} className="p-1.5 text-slate-400 hover:text-indigo-500 transition opacity-0 group-hover:opacity-100" aria-label="Edit">
              <Edit className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(s.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100" aria-label="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
