import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Sub-components
import Sidebar from './layout/Sidebar';
import MobileHeader from './layout/MobileHeader';
import MobileBottomNav from './layout/MobileBottomNav';
import QuickActionMenu from './layout/QuickActionMenu';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

/**
 * Layout Principal
 * Atua como "Smart Component" orquestrando a navegação, estado do menu e lógica de roteamento do FAB.
 */
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // --- Configuration ---

  const sidebarItems = [
    { to: '/', icon: 'fas fa-home', label: 'Home' },
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas' },
    { to: '/settings', icon: 'fas fa-gear', label: 'Ajustes' },
  ];

  const mobileLeftItems = [
    { to: '/', icon: 'fas fa-home', label: 'Home' },
    { to: '/modules', icon: 'fas fa-boxes-stacked', label: 'Modúlos' },
  ];

  const mobileRightItems = [
    { to: '/tasks', icon: 'fas fa-bars-staggered', label: 'Tarefas' }, 
    { to: '/ia', icon: 'fas fa-brain', label: 'IA' },
  ];

  // --- Logic ---

  if (hideNav) return <>{children}</>;

  const handleQuickAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    setShowQuickMenu(false);
    if (action === 'ai') navigate('/'); 
  };
  
  const handleFabClick = () => {
    const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

    if (isDashboard) {
      setShowQuickMenu(!showQuickMenu);
      return;
    }

    // Lógica inteligente de redirecionamento baseada no contexto
    if (location.pathname.includes('/finance')) {
      navigate('/finance/new');
    } else if (location.pathname.includes('/tasks')) {
      navigate('/tasks/new');
    } else if (location.pathname.includes('/health')) {
      navigate('/health/new');
    } else {
      navigate('/tasks/new');
    }
    
    setShowQuickMenu(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      
      {/* Desktop Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Mobile Header */}
      <MobileHeader 
        onSettingsClick={() => navigate('/settings')} 
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 lg:p-10 lg:pb-10 pb-28 transition-all">
        {children}
      </main>

      {/* Quick Action Overlay & Menu */}
      <QuickActionMenu 
        isOpen={showQuickMenu} 
        onClose={() => setShowQuickMenu(false)}
        onAction={handleQuickAction}
      />

      {/* Mobile Bottom Navigation & FAB */}
      <MobileBottomNav 
        leftItems={mobileLeftItems}
        rightItems={mobileRightItems}
        onFabClick={handleFabClick}
        isMenuOpen={showQuickMenu}
      />

    </div>
  );
};

export default Layout;