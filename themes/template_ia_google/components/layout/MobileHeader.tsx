
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../features/notifications/hooks/useNotifications';

interface MobileHeaderProps {
  onSettingsClick: () => void;
  userName?: string;
}

/**
 * MobileHeader Component
 * Exibe o cabeçalho em dispositivos móveis com acesso rápido ao perfil e notificações.
 */
const MobileHeader: React.FC<MobileHeaderProps> = ({ onSettingsClick, userName = "Usuário Ghz" }) => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <header className="lg:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-5 py-3 sticky top-0 z-30 flex justify-between items-center transition-all">
      
      {/* Left: Avatar (Click to Settings) */}
      <button 
        onClick={onSettingsClick} 
        className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 active:scale-95 transition-all overflow-hidden"
      >
        <div className="w-full h-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
           <i className="fas fa-user text-sm"></i>
        </div>
      </button>

      {/* Center: Info Label */}
      <div className="flex flex-col items-center">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Bem-vindo de volta</span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <h1 className="text-sm font-black text-slate-800 dark:text-white tracking-tight leading-tight">
            {userName}
          </h1>
          <span className="text-sm animate-pulse">👋</span>
        </div>
      </div>

      {/* Right: Notifications */}
      <button 
        onClick={() => navigate('/notifications')}
        className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all relative group"
      >
        <i className={`far fa-bell transition-colors text-lg ${unreadCount > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}></i>
        
        {/* Red Dot Indicator (Só aparece se houver não lidas) */}
        {unreadCount > 0 && (
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
        )}
      </button>

    </header>
  );
};

export default MobileHeader;
