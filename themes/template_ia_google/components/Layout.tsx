import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModules } from '../features/modules/hooks/useModules';

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
 * Atua como "Smart Component" orquestrando a navegação, estado do menu e lógica de roteamento.
 * Agora filtra e ORDENA rotas baseadas nos módulos ativos e preferências do usuário.
 */
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { modules, moduleOrder } = useModules(); // Adicionado moduleOrder
  
  const hideNav = location.pathname === '/login' || location.pathname === '/register';
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Verifica rotas para comportamento do FAB
  const isModulesPage = location.pathname === '/modules';
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  // --- Helper de Verificação de Módulo ---
  const isModuleEnabled = (moduleId: string) => {
    const mod = modules.find(m => m.id === moduleId);
    return mod ? mod.isEnabled : true; 
  };

  // --- Configuration ---

  const allSidebarItems = [
    { to: '/', icon: 'fas fa-home', label: 'Home', moduleId: 'core' },
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças', moduleId: 'finance' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde', moduleId: 'health' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas', moduleId: 'productivity' },
    { to: '/ia', icon: 'fas fa-brain', label: 'Ghz IA', moduleId: 'ai_assistant' },
    { to: '/modules', icon: 'fas fa-boxes-stacked', label: 'Módulos', moduleId: 'core' },
    { to: '/settings', icon: 'fas fa-gear', label: 'Ajustes', moduleId: 'core' },
  ];

  const allMobileItems = [
    { to: '/', icon: 'fas fa-home', label: 'Home', moduleId: 'core' },
    { to: '/tasks', icon: 'fas fa-bars-staggered', label: 'Tarefas', moduleId: 'productivity' }, 
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças', moduleId: 'finance' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde', moduleId: 'health' },
    { to: '/ia', icon: 'fas fa-brain', label: 'IA', moduleId: 'ai_assistant' },
    { to: '/modules', icon: 'fas fa-boxes-stacked', label: 'Módulos', moduleId: 'core' },
  ];

  // --- Sorting & Filtering Logic ---
  
  // Função para pegar o peso (índice) do módulo na ordem definida pelo usuário
  const getModuleWeight = (moduleId: string) => {
      if (moduleId === 'core') return -1; // Core itens (Home) geralmente ficam primeiro ou por último, aqui forçamos prioridade se não estiverem na lista
      const index = moduleOrder.indexOf(moduleId);
      return index === -1 ? 999 : index; // Se não achou, joga pro fim
  };

  const processItems = (items: any[]) => {
    // 1. Filtra desabilitados
    const active = items.filter(item => {
        if (item.moduleId === 'core') return true;
        return isModuleEnabled(item.moduleId);
    });

    // 2. Ordena baseado no moduleOrder
    return active.sort((a, b) => {
        const weightA = getModuleWeight(a.moduleId);
        const weightB = getModuleWeight(b.moduleId);
        return weightA - weightB;
    });
  };

  const sidebarItems = processItems(allSidebarItems);
  
  // Para mobile, processamos a lista completa e depois dividimos
  const sortedMobileItems = processItems(allMobileItems);
  
  // Lógica simples de divisão: Home sempre na esquerda se existir, o resto distribui
  // Mas para respeitar a ordem do usuário, vamos pegar os 4 primeiros itens (já que o FAB é o 5º elemento central)
  // Limita a 4 itens na barra inferior para não quebrar o layout (2 esq + 2 dir)
  const mobileNavDisplay = sortedMobileItems.slice(0, 4);
  const mobileLeftItems = mobileNavDisplay.slice(0, 2);
  const mobileRightItems = mobileNavDisplay.slice(2, 4);

  // --- Actions Logic ---

  if (hideNav) return <>{children}</>;

  const handleQuickAction = (action: string) => {
    setShowQuickMenu(false);
    if (action === 'ai') navigate('/ia'); 
  };
  
  const handleFabClick = () => {
    // 1. Lógica Específica da Tela de Módulos
    if (isModulesPage) {
        navigate('/modules/order');
        return;
    }

    // 2. Comportamento Padrão (Quick Menu ou Atalhos)
    if (isDashboard) {
      setShowQuickMenu(!showQuickMenu);
      return;
    }

    if (location.pathname.includes('/finance')) {
      navigate('/finance/new');
    } else if (location.pathname.includes('/tasks')) {
      const params = new URLSearchParams(location.search);
      const currentType = params.get('type');
      navigate('/tasks/new', { state: { defaultType: currentType } });
    } else if (location.pathname.includes('/health')) {
      navigate('/health/new');
    } else {
      navigate('/tasks/new');
    }
    
    setShowQuickMenu(false);
  };

  // Define o ícone do FAB
  let fabIcon = "fas fa-plus";
  if (isModulesPage) {
    fabIcon = "fas fa-sort";
  } else if (isDashboard) {
    fabIcon = "fas fa-layer-group";
  }

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
        enableAi={isModuleEnabled('ai_assistant')}
      />

      {/* Mobile Bottom Navigation & FAB */}
      <MobileBottomNav 
        leftItems={mobileLeftItems}
        rightItems={mobileRightItems}
        onFabClick={handleFabClick}
        isMenuOpen={showQuickMenu}
        // Ícone dinâmico: 'sort' para módulos, 'layer-group' para dashboard (menu), 'plus' para páginas internas
        fabIcon={fabIcon} 
      />

    </div>
  );
};

export default Layout;
