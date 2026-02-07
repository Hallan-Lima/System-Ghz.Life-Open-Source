import React from 'react';

interface ModuleCardProps {
  title: string;
  icon: string;
  bg: string;
  onClick: () => void;
}

/**
 * @author HallTech AI
 * Card de navegação rápida para módulos do sistema.
 */
const ModuleCard: React.FC<ModuleCardProps> = ({ title, icon, bg, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 w-36 h-24 ${bg} rounded-3xl p-4 flex flex-col justify-between text-left relative overflow-hidden shadow-lg active:scale-95 transition-all`}
  >
    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs">
      <i className="fas fa-arrow-right -rotate-45"></i>
    </div>
    <span className="text-white font-black text-sm relative z-10">{title}</span>
    <i
      className={`${icon} absolute -bottom-2 -right-2 text-6xl text-white/20`}
    ></i>
  </button>
);

export default ModuleCard;