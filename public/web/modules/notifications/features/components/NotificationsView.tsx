
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/shared/ui/layout/Layout";
import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

/**
 * @author HallTech AI
 * View principal de Notificações.
 */
const NotificationsView: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllAsRead, clearAll, markAsRead, deleteNotification, loading } = useNotifications();

  return (
    <Layout title="Notificações">
      <div className="min-h-screen pb-24">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6 px-1">
            <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">Suas Atualizações</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                    Você tem <span className="text-indigo-500 font-bold">{unreadCount}</span> novas notificações
                </p>
            </div>
            
            <div className="flex gap-2">
                {unreadCount > 0 && (
                    <button 
                        onClick={markAllAsRead}
                        className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                        title="Marcar todas como lidas"
                    >
                        <i className="fas fa-check-double text-xs"></i>
                    </button>
                )}
                {notifications.length > 0 && (
                    <button 
                        onClick={clearAll}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        title="Limpar tudo"
                    >
                        <i className="fas fa-trash-alt text-xs"></i>
                    </button>
                )}
            </div>
        </div>

        {/* Content */}
        {loading ? (
             <div className="flex justify-center py-20">
                <i className="fas fa-spinner animate-spin text-indigo-600 text-3xl"></i>
             </div>
        ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-bell-slash text-2xl text-slate-400"></i>
                </div>
                <p className="font-bold text-slate-500 text-sm">Nenhuma notificação por enquanto.</p>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-4 text-indigo-500 text-xs font-black uppercase tracking-widest hover:underline"
                >
                    Voltar para Home
                </button>
            </div>
        ) : (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {notifications.map(notification => (
                    <NotificationItem 
                        key={notification.id}
                        notification={notification}
                        onMarkRead={markAsRead}
                        onDelete={deleteNotification}
                    />
                ))}
            </div>
        )}

      </div>
    </Layout>
  );
};

export default NotificationsView;
