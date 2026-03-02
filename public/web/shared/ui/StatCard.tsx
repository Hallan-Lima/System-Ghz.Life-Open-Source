import React from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

/**
 * @author HallTech AI
 * Card de estatística com ícone, label e valor destacado.
 */
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-xl font-black text-slate-800 dark:text-white">
          {value}
        </p>
      </div>
      <div className={`text-xl ${color} opacity-80 group-hover:scale-110 transition-transform`}>
        <i className={icon}></i>
      </div>
    </div>
  </div>
);

export default StatCard;