import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hidden lg:block border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by EventPulse AI
          </p>
          <p>© 2026 TechVerse Conference. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
