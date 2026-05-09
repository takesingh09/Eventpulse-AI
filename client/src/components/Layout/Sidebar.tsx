import { NavLink } from 'react-router-dom';
import { Home, Calendar, Map, MessageCircle, Users, Star, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/qna', icon: MessageCircle, label: 'Q&A' },
  { to: '/networking', icon: Users, label: 'Network' },
  { to: '/feedback', icon: Star, label: 'Feedback' },
  { to: '/notifications', icon: Bell, label: 'Alerts' },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
        <nav className="flex-1 p-4 space-y-1" aria-label="Sidebar navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
            >
              <Shield className="w-5 h-5" />
              Admin
            </NavLink>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-300 mb-1">TechVerse 2026</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">June 15-17 · New Delhi</p>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10" aria-label="Mobile navigation">
        <div className="flex items-center justify-around py-2 px-2">
          {NAV_ITEMS.slice(0, 5).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition ${isActive ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-400'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
