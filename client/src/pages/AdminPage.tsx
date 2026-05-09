import { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AdminPanel from '../components/Admin/AdminPanel';
import { MOCK_SESSIONS } from '../hooks/mockData';
import type { Session } from '../types';

export default function AdminPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);

  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="p-4 rounded-full bg-red-500/10 mb-4">
          <Lock className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">You need admin privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-0">
      <AdminPanel
        sessions={sessions}
        onAddSession={(s) => setSessions(prev => [...prev, s as Session])}
        onUpdateSession={(id, data) => setSessions(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))}
        onDeleteSession={(id) => setSessions(prev => prev.filter(s => s.id !== id))}
        onBroadcast={(msg, type) => console.log('Broadcast:', type, msg)}
      />
    </div>
  );
}
