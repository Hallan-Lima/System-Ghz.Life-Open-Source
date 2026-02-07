import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarItem {
  to: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

/**
 * Sidebar Component (Desktop)
 * Responsável pela navegação lateral em telas grandes.
 */
const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 p-6 z-40">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
          <i className="fas fa-bolt"></i>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">Ghz.Life</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">by HallTech</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`
            }
          >
            <i className={`${item.icon} text-lg w-6`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <i className="fas fa-user text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">Usuário HallTech</p>
            <p className="text-[10px] text-slate-400">Plano Premium</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;