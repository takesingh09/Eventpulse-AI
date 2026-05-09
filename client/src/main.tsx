import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import MapPage from './pages/MapPage';
import NetworkingPage from './pages/NetworkingPage';
import QnAPage from './pages/QnAPage';
import FeedbackPage from './pages/FeedbackPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminPage from './pages/AdminPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'networking', element: <NetworkingPage /> },
      { path: 'qna', element: <QnAPage /> },
      { path: 'feedback', element: <FeedbackPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
