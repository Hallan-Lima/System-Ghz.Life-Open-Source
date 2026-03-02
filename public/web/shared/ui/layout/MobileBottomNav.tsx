import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  icon: string;
  label: string;
}

interface MobileBottomNavProps {
  leftItems: NavItem[];
  rightItems: NavItem[];
  onFabClick: () => void;
  isMenuOpen: boolean;
  fabIcon?: string; // Novo suporte a ícone dinâmico
}

/**
 * MobileBottomNav Component
 * Navegação inferior com botão de ação flutuante (FAB) centralizado.
 */
const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  leftItems, 
  rightItems, 
  onFabClick, 
  isMenuOpen,
  fabIcon = "fas fa-plus" // Default
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 safe-bottom z-50 h-20 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 h-full items-center px-2">
        
        {/* Left Items */}
        {leftItems.map((item) => (
          <NavLink 
            key={item.to}
            to={item.to} 
            className={({ isActive }) => `flex flex-col items-center justify-center h-full transition-all duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
          >
            <i className={`${item.icon} text-xl mb-1`}></i>
            <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
          </NavLink>
        ))}

        {/* Central FAB */}
        <div className="relative -top-6 flex justify-center">
          <button 
            onClick={onFabClick}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-indigo-600/30 transition-all duration-300 transform ${isMenuOpen ? 'bg-slate-800 rotate-45' : 'bg-indigo-600 hover:scale-105 active:scale-95'}`}
          >
            <i className={`${isMenuOpen ? "fas fa-plus" : fabIcon} text-white text-xl`}></i>
          </button>
        </div>

        {/* Right Items */}
        {rightItems.map((item) => (
          <NavLink 
            key={item.to}
            to={item.to} 
            className={({ isActive }) => `flex flex-col items-center justify-center h-full transition-all duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
          >
            <i className={`${item.icon} text-xl mb-1`}></i>
            <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
          </NavLink>
        ))}
        
      </div>
    </nav>
  );
};

export default MobileBottomNav;
