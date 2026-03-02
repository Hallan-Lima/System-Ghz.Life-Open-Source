import React from "react";
import HealthView from '@/modules/health/features/components/HealthView';
import ModuleGuard from '@/shared/ui/layout/ModuleGuard';

/**
 * @author HallTech AI
 * Página de Saúde.
 * Ponto de entrada da rota.
 */
const HealthPage: React.FC = () => {
  return (
    <ModuleGuard routePath="/health">
      <HealthView />
    </ModuleGuard>
  );
};

export default HealthPage;
