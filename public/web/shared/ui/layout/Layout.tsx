import React, { useState, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';
import QuickActionMenu from './QuickActionMenu';
import { useModules } from '@/core/modules/features/modules/hooks/useModules';

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
  const location = useLocation();
  const { modules } = useModules();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Example navigation items, should match the app's routing
  const sidebarItems = [
    { to: '/dashboard', icon: 'fas fa-home', label: 'Início' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas' },
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde' },
    { to: '/settings', icon: 'fas fa-cog', label: 'Configurações' },
  ];

  const mobileLeftItems = [
    { to: '/dashboard', icon: 'fas fa-home', label: 'Início' },
    { to: '/modules', icon: 'fas fa-layer-group', label: 'Módulos' },
  ];

  const mobileRightItems = useMemo(() => {
    const items: Array<{ to: string, icon: string, label: string }> = [];
    
    // Pega até 2 módulos ativos para preencher o lado direito
    const rightSideModules = modules.filter(m => m.isEnabled).slice(0, 2);

    rightSideModules.forEach(m => {
      let route = '/dashboard';
      const title = m.title?.toLowerCase() || '';
      
      if (title.includes('produtiv') || title.includes('tarefa')) route = '/tasks';
      else if (title.includes('finanç') || title.includes('financeiro')) route = '/finance';
      else if (title.includes('saúd') || title.includes('health') || title.includes('bem-estar')) route = '/health';
      else if (title.includes('social')) route = '/social';
      else if (title.includes('ia') || title.includes('inteligênci')) route = '/ia';
      
      items.push({
        to: route,
        icon: m.icon || 'fas fa-cube',
        label: m.title
      });
    });

    // Fallback de design para não quebrar a simetria flex-col caso usuário não possua módulos suficientes ativos
    // Editado: Removido push de Ajustes da direita. Se houver apenas 1 módulo, ficará apenas 1 módulo.
    if (items.length === 0) {
      items.push({ to: '/tasks', icon: 'fas fa-list-check', label: 'Carregando' });
    }

    return items;
  }, [modules]);

  // FAB contextual logic
  const isTasksPage = location.pathname.startsWith('/tasks');
  const isModulesPage = location.pathname.startsWith('/modules');

  const handleFabClick = () => {
    if (isTasksPage) {
      navigate('/tasks/new');
    } else if (isModulesPage) {
      navigate('/modules/order');
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const getFabIcon = () => {
    if (isTasksPage) return "fas fa-plus";
    if (isModulesPage) return "fas fa-sort-amount-down"; // Ícone de gestão de ordem
    return "fas fa-plus"; // Restante usa o + giratório
  };

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
          onFabClick={handleFabClick}
          isMenuOpen={!isTasksPage && !isModulesPage && isMobileMenuOpen}
          fabIcon={getFabIcon()}
        />

        {/* Quick Action Overlay (FAB Menu) - Oculto na tela de Tarefas pois o botão redireciona */}
        {!isTasksPage && !isModulesPage && (
          <QuickActionMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}

      </div>
    </div>
  );
};

export default Layout;
