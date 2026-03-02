import { Transaction, TransactionType } from "@/modules/finance/domain/finance.types";

/**
 * @author HallTech AI
 * Estrutura de dados mockados para o módulo financeiro.
 */
export const financeMocks = {
  summary: {
    income: 5245.00,
    expense: 1890.20,
    reserve: 3355.00
  },
  transactions: [
    { 
      id: '1', 
      title: 'HallTech Cloud Services', 
      amount: 89.90, 
      type: TransactionType.EXPENSE, 
      category: 'Cloud', 
      date: 'Hoje' 
    },
    { 
      id: '2', 
      title: 'Freelance Design HallTech', 
      amount: 2500.00, 
      type: TransactionType.INCOME, 
      category: 'Work', 
      date: 'Ontem' 
    },
    { 
      id: '3', 
      title: 'Supermercado Campinas', 
      amount: 450.00, 
      type: TransactionType.EXPENSE, 
      category: 'Food', 
      date: '25 Out' 
    },
    { 
      id: '4', 
      title: 'Assinatura Ghz.Life Pro', 
      amount: 0.99, 
      type: TransactionType.EXPENSE, 
      category: 'App', 
      date: '20 Out' 
    },
  ] as Transaction[]
};