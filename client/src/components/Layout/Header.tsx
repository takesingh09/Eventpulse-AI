import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, LogIn, LogOut, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationBell from '../Notifications/NotificationBell';
import { useState } from 'react';
import type { SupportedLanguage } from '../../types';
import { LANGUAGE_LABELS } from '../../types';
import { setStoredLanguage, getStoredLanguage } from '../../services/translate';

export default function Header() {
  const { user, signIn, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAllRead } = useNotifications(user?.uid);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(getStoredLanguage());

  const handleLangChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    setStoredLanguage(lang);
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-shadow">
              EP
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">EventPulse</span>
              <span className="text-indigo-500 font-bold text-sm ml-0.5">AI</span>
              <p className="text-[10px] text-slate-400 leading-none">TechVerse 2026</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {[
              { to: '/', label: 'Home' },
              { to: '/schedule', label: 'Schedule' },
              { to: '/map', label: 'Map' },
              { to: '/qna', label: 'Q&A' },
              { to: '/networking', label: 'Network' },
              { to: '/feedback', label: 'Feedback' },
            ].map(link => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))}
            {user?.isAdmin && <NavLink to="/admin" label="Admin" />}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition text-sm text-slate-600 dark:text-slate-400" aria-label="Change language">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">{LANGUAGE_LABELS[currentLang]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden z-50 animate-fade-in">
                  {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map(lang => (
                    <button key={lang} onClick={() => handleLangChange(lang)} className={`w-full px-4 py-2 text-left text-sm transition ${currentLang === lang ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Notifications */}
            <NotificationBell notifications={notifications} unreadCount={unreadCount} onMarkAllRead={markAllRead} />

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <button onClick={signOut} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition" aria-label="Sign out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={signIn} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
                <LogIn className="w-4 h-4" /> Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
      {label}
    </Link>
  );
}
