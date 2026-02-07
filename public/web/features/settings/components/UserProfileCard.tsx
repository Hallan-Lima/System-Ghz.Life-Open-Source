import React from "react";
import { UserProfile } from "../settings.types";

interface UserProfileCardProps {
  user: UserProfile | null;
}

/**
 * @author HallTech AI
 * Card com avatar e informações básicas do usuário.
 */
const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  if (!user) return <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"></div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
        <i className={`${user.avatarIcon} text-2xl text-indigo-600 dark:text-indigo-400`}></i>
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{user.name}</h3>
        <p className="text-sm text-slate-400">{user.plan}</p>
      </div>
      <button className="ml-auto text-slate-300 hover:text-indigo-600 transition-colors">
        <i className="fas fa-edit"></i>
      </button>
    </div>
  );
};

export default UserProfileCard;