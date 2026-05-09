import { Link } from 'react-router-dom';
import { Calendar, Map, MessageCircle, Users, Sparkles, ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_SESSIONS } from '../hooks/mockData';
import SessionCard from '../components/Schedule/SessionCard';

const FEATURES = [
  { icon: Sparkles, title: 'AI Assistant', desc: 'Ask anything about the event', to: '/', color: 'from-purple-500 to-indigo-600' },
  { icon: Calendar, title: 'Smart Schedule', desc: 'Personalized agenda builder', to: '/schedule', color: 'from-blue-500 to-cyan-500' },
  { icon: Map, title: 'Venue Map', desc: 'Interactive navigation', to: '/map', color: 'from-emerald-500 to-teal-500' },
  { icon: MessageCircle, title: 'Live Q&A', desc: 'Ask speakers directly', to: '/qna', color: 'from-orange-500 to-red-500' },
  { icon: Users, title: 'Networking', desc: 'AI-matched connections', to: '/networking', color: 'from-pink-500 to-rose-500' },
  { icon: Globe, title: 'Multi-language', desc: '5 languages supported', to: '/', color: 'from-amber-500 to-orange-500' },
];

const STATS = [
  { label: 'Sessions', value: '15+' },
  { label: 'Speakers', value: '10' },
  { label: 'Tracks', value: '5' },
  { label: 'Days', value: '3' },
];

export default function HomePage() {
  const { user, signIn } = useAuth();
  const upcomingSessions = MOCK_SESSIONS.slice(0, 3);

  return (
    <div className="space-y-12 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium mb-4">
            <Zap className="w-3 h-3" /> Powered by Google Gemini AI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
            Welcome to<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">TechVerse 2026</span>
          </h1>
          <p className="text-indigo-100 text-base md:text-lg max-w-xl mb-6">
            Your AI-powered companion for the biggest tech conference of the year. Navigate sessions, network with peers, and never miss a beat.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/schedule" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition shadow-lg shadow-black/10">
              View Schedule <ArrowRight className="w-4 h-4" />
            </Link>
            {!user && (
              <button onClick={signIn} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur text-white font-semibold text-sm hover:bg-white/30 transition border border-white/30">
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5 text-center hover:border-indigo-500/30 transition">
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">What EventPulse AI Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <Link key={f.title} to={f.to} className="group p-5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:scale-[1.02]">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Sessions</h2>
          <Link to="/schedule" className="text-sm text-indigo-500 hover:text-indigo-600 transition flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingSessions.map(s => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
