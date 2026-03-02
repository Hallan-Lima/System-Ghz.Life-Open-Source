import React from "react";
import { Transaction, TransactionType } from "@/modules/finance/domain/finance.types";

interface TransactionItemProps {
  transaction: Transaction;
}

/**
 * @author HallTech AI
 * Componente de item individual da lista de transações.
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isIncome = transaction.type === TransactionType.INCOME;

  return (
    <div className="group p-5 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
      <div className="flex items-center gap-5 mb-4 sm:mb-0">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
            isIncome
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-500"
          }`}
        >
          <i className={isIncome ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-100">
            {transaction.title}
          </h4>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">
            {transaction.category} • {transaction.date}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-50 dark:border-slate-800 pt-4 sm:pt-0">
        <p
          className={`text-xl font-black ${
            isIncome ? "text-emerald-600" : "text-slate-800 dark:text-white"
          }`}
        >
          {isIncome ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
        </p>
        <button className="text-slate-200 group-hover:text-slate-400 transition-colors">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;