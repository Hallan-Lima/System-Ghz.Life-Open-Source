
/**
 * @author HallTech AI
 * Definições de tipo para o sistema de notificações.
 */

export type NotificationType = 'info' | 'success' | 'warning' | 'alert' | 'system';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string; // ISO string ou data formatada
  read: boolean;
  actionRoute?: string; // Rota para redirecionar ao clicar (opcional)
}
