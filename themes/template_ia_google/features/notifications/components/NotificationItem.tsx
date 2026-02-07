
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppNotification } from "../notifications.types";

interface NotificationItemProps {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * @author HallTech AI
 * Item individual da lista de notificações.
 */
const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkRead, onDelete }) => {
  const navigate = useNavigate();

  const getIconConfig = () => {
    switch (notification.type) {
      case 'success': return { icon: 'fas fa-check-circle', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/20' };
      case 'warning': return { icon: 'fas fa-exclamation-triangle', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/20' };
      case 'alert': return { icon: 'fas fa-bell', color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/20' };
      case 'info': return { icon: 'fas fa-info-circle', color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/20' };
      default: return { icon: 'fas fa-cog', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' };
    }
  };

  const config = getIconConfig();

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
    if (notification.actionRoute) {
      navigate(notification.actionRoute);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative p-4 rounded-2xl border transition-all active:scale-[0.99] cursor-pointer group flex items-start gap-4 ${
        notification.read 
          ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-80 hover:opacity-100' 
          : 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30'
      }`}
    >
      {/* Indicador de não lido */}
      {!notification.read && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500 shadow-sm"></span>
      )}

      {/* Ícone */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
        <i className={config.icon}></i>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0 pr-6">
        <h4 className={`font-bold text-sm mb-1 ${notification.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
          {notification.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {notification.message}
        </p>
        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
          {notification.timestamp}
        </p>
      </div>

      {/* Delete Button (Hover only on desktop, visible on logic if needed) */}
      <button 
        onClick={(e) => {
            e.stopPropagation();
            onDelete(notification.id);
        }}
        className="absolute bottom-4 right-4 text-slate-300 hover:text-rose-500 transition-colors p-2"
      >
        <i className="fas fa-trash text-xs"></i>
      </button>
    </div>
  );
};

export default NotificationItem;
