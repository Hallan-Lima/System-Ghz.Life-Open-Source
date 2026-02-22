import React from "react";
import FinanceView from "../features/finance/components/FinanceView";
import ModuleGuard from "../components/layout/ModuleGuard";

/**
 * @author HallTech AI
 * Página Financeira.
 * Ponto de entrada para a feature de finanças.
 */
const FinancePage: React.FC = () => {
  return (
    <ModuleGuard routePath="/finance">
      <FinanceView />
    </ModuleGuard>
  );
};

export default FinancePage;
