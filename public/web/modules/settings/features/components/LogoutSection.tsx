import React from "react";

interface LogoutSectionProps {
  onLogout: () => void;
}

/**
 * @author HallTech AI
 * Botão de Logout estilizado.
 */
const LogoutSection: React.FC<LogoutSectionProps> = ({ onLogout }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
      <button 
        onClick={onLogout}
        className="w-full p-4 flex items-center gap-3 text-rose-500 font-bold active:bg-rose-50 dark:active:bg-rose-950/20 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
          <i className="fas fa-sign-out-alt"></i>
        </div>
        Sair da Conta
      </button>
    </div>
  );
};

export default LogoutSection;