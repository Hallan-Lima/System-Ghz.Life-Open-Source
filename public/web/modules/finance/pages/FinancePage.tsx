import React from "react";
import FinanceView from '@/modules/finance/features/components/FinanceView';
import ModuleGuard from '@/shared/ui/layout/ModuleGuard';

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
