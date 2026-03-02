import React from "react";
import Layout from "@/shared/ui/layout/Layout";
import FinanceSummary from "./FinanceSummary";
import TransactionList from "./TransactionList";
import { useFinance } from '@/modules/finance/features/hooks/useFinance';

/**
 * @author HallTech AI
 * View principal do módulo Financeiro.
 * Integra os componentes de apresentação com a lógica do hook.
 */
const FinanceView: React.FC = () => {
  const { transactions, summary, loading } = useFinance();

  return (
    <Layout title="Ghz Financeiro">
      <div className="space-y-8">
        {loading ? (
           <div className="flex justify-center py-20">
             <i className="fas fa-spinner animate-spin text-indigo-600 text-3xl"></i>
           </div>
        ) : (
          <>
            <FinanceSummary
              income={summary.income}
              expense={summary.expense}
              reserve={summary.reserve}
            />
            <TransactionList transactions={transactions} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default FinanceView;