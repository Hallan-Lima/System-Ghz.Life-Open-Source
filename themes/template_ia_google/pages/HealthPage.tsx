import React from "react";
import HealthView from "../features/health/components/HealthView";
import ModuleGuard from "../components/layout/ModuleGuard";

/**
 * @author HallTech AI
 * Página de Saúde.
 * Ponto de entrada da rota.
 */
const HealthPage: React.FC = () => {
  return (
    <ModuleGuard moduleId="health">
      <HealthView />
    </ModuleGuard>
  );
};

export default HealthPage;
