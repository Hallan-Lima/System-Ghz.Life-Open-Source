
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/modules/notifications/features/hooks/useNotifications";

interface SettingsMenuProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

/**
 * @author HallTech AI
 * Menu com opções gerais (Tema, Notificações, Segurança).
 */
const SettingsMenu: React.FC<SettingsMenuProps> = ({ isDarkMode, onToggleTheme }) => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
      
      {/* Dark Mode Toggle */}
      <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
            <i className="fas fa-moon"></i>
          </div>
          <span className="font-medium text-slate-700 dark:text-slate-200">Modo Escuro</span>
        </div>
        <button 
          onClick={onToggleTheme}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
        </button>
      </div>

      {/* Notifications Link */}
      <button 
        onClick={() => navigate('/notifications')}
        className="w-full p-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between active:bg-slate-50 dark:active:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
            <i className="fas fa-bell"></i>
          </div>
          <span className="font-medium text-slate-700 dark:text-slate-200">Notificações</span>
        </div>
        <div className="flex items-center gap-2">
            {unreadCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                </span>
            )}
            <i className="fas fa-chevron-right text-slate-300 text-xs"></i>
        </div>
      </button>

      {/* Security Link */}
      <button className="w-full p-4 flex items-center justify-between active:bg-slate-50 dark:active:bg-slate-800 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
            <i className="fas fa-shield-halved"></i>
          </div>
          <span className="font-medium text-slate-700 dark:text-slate-200">Segurança</span>
        </div>
        <i className="fas fa-chevron-right text-slate-300 text-xs"></i>
      </button>
    </div>
  );
};

export default SettingsMenu;
