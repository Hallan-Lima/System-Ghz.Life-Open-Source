
import React from 'react';
import Layout from '../components/Layout';
import { TransactionType } from '../domain/types';

const Finance: React.FC = () => {
  const transactions = [
    { id: '1', title: 'HallTech Cloud Services', amount: 89.90, type: TransactionType.EXPENSE, category: 'Cloud', date: 'Hoje' },
    { id: '2', title: 'Freelance Design HallTech', amount: 2500.00, type: TransactionType.INCOME, category: 'Work', date: 'Ontem' },
    { id: '3', title: 'Supermercado Campinas', amount: 450.00, type: TransactionType.EXPENSE, category: 'Food', date: '25 Out' },
    { id: '4', title: 'Assinatura Ghz.Life Pro', amount: 0.99, type: TransactionType.EXPENSE, category: 'App', date: '20 Out' },
  ];

  return (
    <Layout title="Ghz Financeiro">
      <div className="space-y-8">
        
        {/* Responsive Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fas fa-arrow-trend-up text-5xl"></i>
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Entradas Mensais</p>
            <h3 className="text-3xl font-black text-emerald-600">R$ 5.245,00</h3>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fas fa-arrow-trend-down text-5xl"></i>
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Saídas Mensais</p>
            <h3 className="text-3xl font-black text-rose-500">R$ 1.890,20</h3>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden sm:col-span-2 lg:col-span-1">
             <div className="absolute top-0 right-0 p-4 opacity-20">
              <i className="fas fa-piggy-bank text-5xl"></i>
            </div>
            <p className="text-[10px] text-indigo-100 font-black uppercase tracking-widest mb-3">Reserva Ghz</p>
            <h3 className="text-3xl font-black">R$ 3.355,00</h3>
          </div>
        </div>

        {/* Filters and List */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 lg:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 px-2">
            <div>
              <h3 className="font-black text-2xl text-slate-800 dark:text-white tracking-tighter">Histórico de Movimentações</h3>
              <p className="text-sm text-slate-400">Suas transações registradas automaticamente pelo Ghz.</p>
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
            {transactions.map(t => (
              <div key={t.id} className="group p-5 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="flex items-center gap-5 mb-4 sm:mb-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                    t.type === TransactionType.INCOME 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-500'
                  }`}>
                    <i className={t.type === TransactionType.INCOME ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{t.title}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{t.category} • {t.date}</p>
                  </div>
                </div>
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-50 dark:border-slate-800 pt-4 sm:pt-0">
                  <p className={`text-xl font-black ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-800 dark:text-white'}`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </p>
                  <button className="text-slate-200 group-hover:text-slate-400 transition-colors">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Finance;
