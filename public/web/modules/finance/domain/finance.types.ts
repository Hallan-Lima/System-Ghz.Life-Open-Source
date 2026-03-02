/**
 * @author HallTech AI
 * Define a natureza de uma movimentação financeira.
 */
export enum TransactionType {
  INCOME = 'INCOME',   // Entradas (Salários, Vendas)
  EXPENSE = 'EXPENSE'  // Saídas (Contas, Compras)
}

/**
 * @author HallTech AI
 * Representa uma transação financeira individual no sistema.
 */
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;        // ISO Date YYYY-MM-DD ou string formatada
}
