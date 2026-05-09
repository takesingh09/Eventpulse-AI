import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import ChatWidget from './components/AIAssistant/ChatWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
