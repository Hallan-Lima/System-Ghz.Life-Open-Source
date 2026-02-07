
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AppNotification } from '../notifications.types';
import { notificationsService } from '../services/notifications.service';

interface NotificationsContextData {
  notifications: AppNotification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  deleteNotification: (id: string) => void;
}

export const NotificationsContext = createContext<NotificationsContextData>({} as NotificationsContextData);

/**
 * @author HallTech AI
 * Provider que envolve a aplicação para gerenciar notificações globais.
 */
export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados iniciais
  useEffect(() => {
    const loadData = async () => {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Persiste alterações
  useEffect(() => {
    if (!loading) {
      notificationsService.saveNotifications(notifications);
    }
  }, [notifications, loading]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationsContext.Provider value={{ 
      notifications, 
      unreadCount, 
      loading, 
      markAsRead, 
      markAllAsRead, 
      clearAll,
      deleteNotification
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};
