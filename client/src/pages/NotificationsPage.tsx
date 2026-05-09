import { Bell, Clock, Megaphone, AlertOctagon, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { getRelativeTime } from '../utils/dateFormatter';

const TYPE_CONFIG = {
  schedule_change: { icon: Clock, color: 'text-amber-400 bg-amber-500/20', label: 'Schedule Change' },
  announcement: { icon: Megaphone, color: 'text-blue-400 bg-blue-500/20', label: 'Announcement' },
  reminder: { icon: Bell, color: 'text-indigo-400 bg-indigo-500/20', label: 'Reminder' },
  emergency: { icon: AlertOctagon, color: 'text-red-400 bg-red-500/20', label: 'Emergency' },
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const { notifications, markAllRead } = useNotifications(user?.uid);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <Bell className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Stay updated on schedule changes and announcements</p>
          </div>
        </div>
        <button onClick={markAllRead} className="px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 transition flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
            <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map(n => {
            const config = TYPE_CONFIG[n.type];
            const Icon = config.icon;
            return (
              <div key={n.id} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/20 transition">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{config.label}</span>
                    <span className="text-xs text-slate-400">{getRelativeTime(n.timestamp)}</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{n.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
