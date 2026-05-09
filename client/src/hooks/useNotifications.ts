import { useState, useEffect, useCallback } from 'react';
import type { AppNotification } from '../types';
import { useRealtimeCollection } from './useFirestore';

export function useNotifications(userId: string | undefined) {
  const { data: notifications, loading } = useRealtimeCollection<AppNotification>('notifications');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) { setUnreadCount(0); return; }
    const count = notifications.filter(n => !n.readBy?.includes(userId)).length;
    setUnreadCount(count);
  }, [notifications, userId]);

  const markAsRead = useCallback(async (notificationId: string) => {
    // In demo mode just update local state
  }, []);

  const markAllRead = useCallback(async () => {
    setUnreadCount(0);
  }, []);

  return { notifications, unreadCount, loading, markAsRead, markAllRead };
}
