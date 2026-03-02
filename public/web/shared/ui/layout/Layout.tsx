import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

/**
 * Global App Layout
 * Orchestrates Sidebar (Desktop) and Mobile Navigations.
 */
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Example navigation items, should match the app's routing
  const sidebarItems = [
    { to: '/', icon: 'fas fa-home', label: 'Início' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas' },
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde' },
    { to: '/settings', icon: 'fas fa-cog', label: 'Configurações' },
  ];

  const mobileLeftItems = [
    { to: '/', icon: 'fas fa-home', label: 'Início' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas' },
  ];

  const mobileRightItems = [
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças' },
    { to: '/settings', icon: 'fas fa-cog', label: 'Ajustes' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* Desktop Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Mobile Top Header */}
        <MobileHeader 
          onSettingsClick={() => navigate('/settings')} 
          userName="Usuário HallTech" 
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 lg:p-8 pb-32 lg:pb-8 relative scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            {title && (
              <header className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-800 dark:text-white relative inline-block">
                  {title}
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-indigo-500 rounded-full"></div>
                </h1>
              </header>
            )}
            
            {/* Render children if passed directly, or Outlet for nested routes */}
            {children || <Outlet />}
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav 
          leftItems={mobileLeftItems}
          rightItems={mobileRightItems}
          onFabClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMenuOpen={isMobileMenuOpen}
        />

      </div>
    </div>
  );
};

export default Layout;
