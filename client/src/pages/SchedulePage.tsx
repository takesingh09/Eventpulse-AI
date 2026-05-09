import { useState, useMemo, useCallback } from 'react';
import type { Track, Session } from '../types';
import { useAuth } from '../hooks/useAuth';
import { MOCK_SESSIONS } from '../hooks/mockData';
import SessionCard from '../components/Schedule/SessionCard';
import ScheduleFilter from '../components/Schedule/ScheduleFilter';
import MySchedule from '../components/Schedule/MySchedule';

export default function SchedulePage() {
  const { user, updateUser } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<Track | 'All'>('All');
  const [selectedDay, setSelectedDay] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const sessions = MOCK_SESSIONS;

  const filteredSessions = useMemo(() => {
    return sessions.filter(s => {
      if (s.day !== selectedDay) return false;
      if (selectedTrack !== 'All' && s.track !== selectedTrack) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [sessions, selectedDay, selectedTrack, searchQuery]);

  const savedSessions = useMemo(() => {
    return sessions.filter(s => user?.savedSessions.includes(s.id));
  }, [sessions, user]);

  const toggleSave = useCallback((id: string) => {
    if (!user) return;
    const saved = user.savedSessions.includes(id)
      ? user.savedSessions.filter(sid => sid !== id)
      : [...user.savedSessions, id];
    updateUser({ savedSessions: saved });
  }, [user, updateUser]);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Event Schedule</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">TechVerse 2026 · June 15-17 · 15 sessions across 5 tracks</p>
        </div>
      </div>

      <ScheduleFilter
        selectedTrack={selectedTrack}
        selectedDay={selectedDay}
        searchQuery={searchQuery}
        onTrackChange={setSelectedTrack}
        onDayChange={setSelectedDay}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <p className="text-slate-500 dark:text-slate-400">No sessions found for this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSessions.map(s => (
                <SessionCard key={s.id} session={s} isSaved={user?.savedSessions.includes(s.id)} onToggleSave={toggleSave} />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 sticky top-20">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">My Schedule ({savedSessions.length})</h3>
            <MySchedule sessions={savedSessions} onRemove={toggleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
