import { useState, useRef, useEffect } from 'react';
import { Bell, X, AlertTriangle, Megaphone, Clock, AlertOctagon } from 'lucide-react';
import type { AppNotification } from '../../types';
import { getRelativeTime } from '../../utils/dateFormatter';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  schedule_change: <Clock className="w-4 h-4 text-amber-400" />,
  announcement: <Megaphone className="w-4 h-4 text-blue-400" />,
  reminder: <Bell className="w-4 h-4 text-indigo-400" />,
  emergency: <AlertOctagon className="w-4 h-4 text-red-400" />,
};

interface Props {
  notifications: AppNotification[];
  unreadCount: number;
  onMarkAllRead: () => void;
}

export default function NotificationBell({ notifications, unreadCount, onMarkAllRead }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition"
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-white/10 overflow-hidden z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={onMarkAllRead} className="text-xs text-indigo-500 hover:text-indigo-600 transition">
                Mark all read
              </button>
            )}
          </div>
          <div className="overflow-y-auto max-h-72">
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-slate-400 text-center">No notifications</p>
            ) : (
              notifications.slice(0, 10).map(n => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition border-b border-slate-100 dark:border-white/5 last:border-0">
                  <span className="mt-0.5">{TYPE_ICONS[n.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{getRelativeTime(n.timestamp)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
