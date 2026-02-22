import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModules } from '../features/modules/hooks/useModules';
import { getModuleRouteForPath } from '../features/modules/moduleRoutes';
import { authService } from '../features/auth/services/auth.service';

// Sub-components
import Sidebar from './layout/Sidebar';
import MobileHeader from './layout/MobileHeader';
import MobileBottomNav from './layout/MobileBottomNav';
import QuickActionMenu from './layout/QuickActionMenu';
import { storage } from '@/services/storage';

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
  
  const hideNav = location.pathname === '/login' || location.pathname === '/auth' || location.pathname === '/register' || location.pathname === '/';
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Verifica rotas para comportamento do FAB
  const isModulesPage = location.pathname === '/modules';
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  // Pega o nome do usuário autenticado ou usa "Convidado"
  const currentUserName = authService.isAuthenticated() 
  ? (storage.getItem("user_profile_name") || "Convidado")
  : "Convidado";

  // --- Helper: permissão por rota (usa module.route = module_router_link da API) ---
  const hasAccessToRoute = (path: string) => {
    const moduleRoute = getModuleRouteForPath(path);
    if (moduleRoute === null) return true;
    const mod = modules.find((m) => m.route === moduleRoute);
    return mod ? mod.isEnabled : false;
  };

  const getModuleWeightByPath = (path: string) => {
    if (getModuleRouteForPath(path) === null) return -1;
    const mod = modules.find((m) => m.route === getModuleRouteForPath(path));
    if (!mod) return 999;
    const index = moduleOrder.indexOf(mod.id);
    return index === -1 ? 999 : index;
  };

  // --- Configuration ---

  const allSidebarItems = [
    { to: '/dashboard', icon: 'fas fa-home', label: 'Home', moduleId: 'core' },
    { to: '/tasks', icon: 'fas fa-list-check', label: 'Tarefas', moduleId: '1' }, // ID 1 = Produtividade
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças', moduleId: '2' },  // ID 2 = Financeiro
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde', moduleId: '3' },   // ID 3 = Saúde
    { to: '/ia', icon: 'fas fa-brain', label: 'Ghz IA', moduleId: '4' },          // ID 4 = IA
    { to: '/social', icon: 'fas fa-users', label: 'Social', moduleId: '5' },      // ID 5 = Social
    { to: '/modules', icon: 'fas fa-boxes-stacked', label: 'Módulos', moduleId: 'core' },
    { to: '/settings', icon: 'fas fa-gear', label: 'Ajustes', moduleId: 'core' },
  ];

  const allMobileItems = [
    { to: '/dashboard', icon: 'fas fa-home', label: 'Home', moduleId: 'core' },
    { to: '/tasks', icon: 'fas fa-bars-staggered', label: 'Tarefas', moduleId: '1' },
    { to: '/finance', icon: 'fas fa-wallet', label: 'Finanças', moduleId: '2' },
    { to: '/health', icon: 'fas fa-heartbeat', label: 'Saúde', moduleId: '3' },
    { to: '/ia', icon: 'fas fa-brain', label: 'IA', moduleId: '4' },
    { to: '/modules', icon: 'fas fa-boxes-stacked', label: 'Módulos', moduleId: 'core' },
  ];

  // --- Sorting & Filtering Logic ---
  
  const processItems = (items: any[]) => {
    const active = items.filter((item) => hasAccessToRoute(item.to));
    return active.sort((a, b) => {
      const weightA = getModuleWeightByPath(a.to);
      const weightB = getModuleWeightByPath(b.to);
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
        userName={currentUserName}
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
        enableAi={hasAccessToRoute('/ia')}
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
