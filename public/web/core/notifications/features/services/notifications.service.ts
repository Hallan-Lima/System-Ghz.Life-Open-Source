
import { notificationMocks } from "../notifications.data";
import { AppNotification } from "../notifications.types";

const STORAGE_KEY = "ghz_notifications_v1";

/**
 * @author HallTech AI
 * Serviço responsável pela persistência e gestão de notificações.
 */
export const notificationsService = {
  getNotifications: async (): Promise<AppNotification[]> => {
    // Simula delay
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Erro ao ler notificações", e);
    }
    
    // Inicializa com mocks se vazio
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notificationMocks));
    return notificationMocks;
  },

  saveNotifications: (notifications: AppNotification[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error("Erro ao salvar notificações", e);
    }
  }
};
