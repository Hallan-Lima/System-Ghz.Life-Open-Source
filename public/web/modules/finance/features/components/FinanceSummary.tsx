import React from "react";

interface FinanceSummaryProps {
  income: number;
  expense: number;
  reserve: number;
}

/**
 * @author HallTech AI
 * Exibe os cards de resumo (Entradas, Saídas e Reserva).
 */
const FinanceSummary: React.FC<FinanceSummaryProps> = ({ income, expense, reserve }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fas fa-arrow-trend-up text-5xl"></i>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">
          Entradas Mensais
        </p>
        <h3 className="text-3xl font-black text-emerald-600">
          R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h3>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fas fa-arrow-trend-down text-5xl"></i>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">
          Saídas Mensais
        </p>
        <h3 className="text-3xl font-black text-rose-500">
          R$ {expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h3>
      </div>

      <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden sm:col-span-2 lg:col-span-1">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <i className="fas fa-piggy-bank text-5xl"></i>
        </div>
        <p className="text-[10px] text-indigo-100 font-black uppercase tracking-widest mb-3">
          Reserva Ghz
        </p>
        <h3 className="text-3xl font-black">
          R$ {reserve.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  );
};

export default FinanceSummary;