
import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

/**
 * @author HallTech AI
 * Hook para acessar notificações e ações.
 */
export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useNotifications deve ser usado dentro de um NotificationsProvider");
  }

  return context;
};
