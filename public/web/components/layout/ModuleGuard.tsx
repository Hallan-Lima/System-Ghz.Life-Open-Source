/**
 * @file ModuleGuard.tsx
 * @description Protege rotas baseadas nos módulos: verifica permissão pelo route do módulo (module_router_link).
 * @author HallTech AI
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../../features/modules/hooks/useModules';
import { getModuleRouteForPath } from '../../features/modules/moduleRoutes';
import config from '../../src/config';

interface ModuleGuardProps {
  /** Path da rota da página (ex: /finance, /tasks, /ia). Usado para encontrar o módulo pelo route retornado pela API. */
  routePath: string;
  children: React.ReactNode;
}

const ModuleGuard: React.FC<ModuleGuardProps> = ({ routePath, children }) => {
  const { modules, loading } = useModules();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const moduleRoute = getModuleRouteForPath(routePath);
    if (moduleRoute === null) {
      return;
    }

    const module = modules.find((m) => m.route === moduleRoute);
    if (!module || !module.isEnabled) {
      console.warn(`🛡️ [ModuleGuard] Acesso negado à rota: ${routePath} (módulo route: ${moduleRoute}). Redirecionando para login.`);

      localStorage.removeItem(config.configStorageKey);
      localStorage.removeItem(config.tokenStorageKey);
      localStorage.removeItem(config.modulesStorageKey);
      localStorage.removeItem(config.modulesOrderKey);

      navigate('/auth', { replace: true });
    }
  }, [modules, loading, routePath, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <i className="fas fa-spinner animate-spin text-indigo-600 text-3xl"></i>
      </div>
    );
  }

  const moduleRoute = getModuleRouteForPath(routePath);
  if (moduleRoute === null) {
    return <>{children}</>;
  }

  const module = modules.find((m) => m.route === moduleRoute);
  if (!module?.isEnabled) {
    return null;
  }

  return <>{children}</>;
};

export default ModuleGuard;
