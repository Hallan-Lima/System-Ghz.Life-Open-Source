import React from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../settings.types";

interface UserProfileCardProps {
  user: UserProfile | null;
}

/**
 * @author HallTech AI
 * Card com avatar e informações básicas do usuário.
 * Exibe os dados vindos do serviço de configurações (que podem ser do storage ou mock).
 */
const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"></div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 relative overflow-hidden">
      {/* Avatar Container */}
      <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 border-2 border-white dark:border-slate-800 shadow-sm">
        <i className={`${user.avatarIcon} text-2xl text-indigo-600 dark:text-indigo-400`}></i>
      </div>
      
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white truncate pr-2">
            {user.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {user.plan}
            </p>
        </div>
      </div>

      {/* Edit Button */}
      <button 
        onClick={() => navigate('/settings/profile')}
        className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all flex items-center justify-center active:scale-90 border border-slate-100 dark:border-slate-700"
        title="Editar Perfil"
      >
        <i className="fas fa-pen text-xs"></i>
      </button>
    </div>
  );
};

export default UserProfileCard;
