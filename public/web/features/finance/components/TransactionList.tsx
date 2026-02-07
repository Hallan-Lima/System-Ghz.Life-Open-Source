import React from "react";
import { Transaction } from "../../../domain/finance.types";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
}

/**
 * @author HallTech AI
 * Lista de histórico de transações com controles de filtro.
 */
const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 lg:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 px-2">
        <div>
          <h3 className="font-black text-2xl text-slate-800 dark:text-white tracking-tighter">
            Histórico de Movimentações
          </h3>
          <p className="text-sm text-slate-400">
            Suas transações registradas automaticamente pelo Ghz.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-slate-500 active:bg-indigo-600 active:text-white transition-all">
            <i className="fas fa-filter"></i>
          </button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95 transition-all">
            NOVA TRANSACÃO
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;