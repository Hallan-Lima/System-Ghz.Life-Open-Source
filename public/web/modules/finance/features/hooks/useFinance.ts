import React, { useState, useEffect } from "react";
import { financeService } from "@/modules/finance/features/services/finance.service";
import { Transaction } from "@/modules/finance/domain/finance.types";

/**
 * @author HallTech AI
 * Hook que centraliza a lógica de estado do módulo Financeiro.
 */
export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, reserve: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await financeService.getFinanceData();
        setTransactions(data.transactions);
        setSummary(data.summary);
      } catch (error) {
        console.error("Erro ao carregar finanças:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    transactions,
    summary,
    loading
  };
};