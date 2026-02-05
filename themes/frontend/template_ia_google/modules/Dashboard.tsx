import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { getGhzAssistantInsights } from '../services/geminiService';
import { Transaction, Task, TransactionType, TaskPriority, HealthStats, TaskType } from '../domain/types';

// --- Mock Data ---
const mockTransactions: Transaction[] = [
  { id: '1', description: 'Assinatura', amount: 0.99, type: TransactionType.EXPENSE, category: 'App', date: '2023-10-25' },
];
const mockTasks: Task[] = [
  { id: '1', title: 'Reunião TCC', completed: false, priority: TaskPriority.HIGH, dueDate: '2023-10-30', type: TaskType.DAILY },
];
const mockHealth: HealthStats = { waterIntake: 1.6, waterGoal: 2.0 };

// --- Sub-components for UI Consistency ---

const SectionHeader: React.FC<{ title: string; onSeeMore?: () => void }> = ({ title, onSeeMore }) => (
  <div className="flex justify-between items-center mb-4 px-1">
    <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">{title}</h2>
    {onSeeMore && (
      <button onClick={onSeeMore} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">
        Ver Mais
      </button>
    )}
  </div>
);

const StatCard: React.FC<{ icon: string; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden group">
    <div className={`absolute top-4 right-4 text-xl ${color} opacity-80 group-hover:scale-110 transition-transform`}>
      <i className={icon}></i>
    </div>
    <div className="mt-auto">
       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
       <p className="text-xl font-black text-slate-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const ModuleCard: React.FC<{ title: string; icon: string; bg: string; onClick: () => void }> = ({ title, icon, bg, onClick }) => (
  <button onClick={onClick} className={`flex-shrink-0 w-36 h-24 ${bg} rounded-3xl p-4 flex flex-col justify-between text-left relative overflow-hidden shadow-lg active:scale-95 transition-all`}>
     <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs">
        <i className="fas fa-arrow-right -rotate-45"></i>
     </div>
     <span className="text-white font-black text-sm relative z-10">{title}</span>
     <i className={`${icon} absolute -bottom-2 -right-2 text-6xl text-white/20`}></i>
  </button>
);

const CircularProgress: React.FC<{ percentage: number; color: string; size?: number }> = ({ percentage, color, size = 120 }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={color} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-black text-slate-800 dark:text-white">{percentage}%</span>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<string>('Analisando dados...');
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    getGhzAssistantInsights(mockTransactions, mockTasks, mockHealth).then(res => {
      setInsight(res);
      setLoadingInsight(false);
    });
  }, []);

  return (
    <Layout title="Visão Geral">
      <div className="space-y-10 pb-20">
        
        {/* 1. Módulos Ativos (Horizontal Scroll) */}
        <section className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max px-1 pb-4">
            <ModuleCard title="Financeiro" icon="fas fa-wallet" bg="bg-emerald-500" onClick={() => navigate('/finance')} />
            <ModuleCard title="Saúde" icon="fas fa-heartbeat" bg="bg-rose-500" onClick={() => navigate('/health')} />
            <ModuleCard title="Tarefas" icon="fas fa-list-check" bg="bg-indigo-500" onClick={() => navigate('/tasks')} />
            <ModuleCard title="Agenda" icon="far fa-calendar-alt" bg="bg-amber-500" onClick={() => {}} />
          </div>
        </section>

        {/* 2. Banner Progresso Diário */}
        <section className="bg-slate-900 dark:bg-indigo-900 rounded-[2.5rem] p-6 relative overflow-hidden shadow-xl flex items-center justify-between group cursor-pointer" onClick={() => navigate('/tasks')}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-rose-500"></div>
          <div className="flex items-center gap-4 relative z-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white text-xl">
               <i className="fas fa-bicycle"></i>
             </div>
             <div>
               <h3 className="text-white font-black text-lg">Progresso Diário</h3>
               <p className="text-slate-400 text-xs font-medium">Você completou 60% das suas metas hoje.</p>
             </div>
          </div>
          <i className="fas fa-chevron-right text-white/50 group-hover:translate-x-1 transition-transform"></i>
        </section>

        {/* 3. Cards de Estatísticas (Grid) */}
        <section className="grid grid-cols-2 gap-4">
          <StatCard icon="fas fa-shoe-prints" label="Passos" value="4.230" color="text-indigo-600" />
          <StatCard icon="fas fa-fire" label="Treino" value="45 min" color="text-amber-500" />
          <StatCard icon="fas fa-droplet" label="Água" value="1.6 L" color="text-cyan-500" />
          <StatCard icon="fas fa-bed" label="Sono" value="7h 20m" color="text-indigo-400" />
        </section>

        {/* 4. Seção Financeira */}
        <section>
          <SectionHeader title="Seção Financeira" onSeeMore={() => navigate('/finance')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mapa Placeholder */}
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-[2.5rem] h-48 relative overflow-hidden border border-slate-200 dark:border-slate-800">
               <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center"></div>
               <div className="absolute bottom-4 left-4">
                 <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Localização</p>
                 <p className="font-black text-slate-800 dark:text-white">Campinas, SP</p>
               </div>
               <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
            </div>

            {/* Progresso Financeiro */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Orçamento Mensal</p>
               <CircularProgress percentage={72} color="text-indigo-600" size={140} />
               <div className="flex justify-between w-full mt-6 px-4">
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Gasto</p>
                    <p className="font-black text-slate-800 dark:text-white">72%</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Livre</p>
                    <p className="font-black text-slate-800 dark:text-white">28%</p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Seção Listas (Acesso Rápido) */}
        <section>
          <SectionHeader title="Acesso Rápido" onSeeMore={() => navigate('/tasks')} />
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Document', icon: 'fas fa-file-alt', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
              { label: 'Quick Note', icon: 'fas fa-pen', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
              { label: 'Folder', icon: 'fas fa-folder-plus', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
              { label: 'Templates', icon: 'fas fa-layer-group', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' }
            ].map((item, idx) => (
              <button key={idx} className={`${item.bg} h-28 rounded-3xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform`}>
                 <i className={`${item.icon} text-2xl ${item.color}`}></i>
                 <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 6. Seção Timer (Sono) */}
        <section>
          <SectionHeader title="Ciclo de Sono" onSeeMore={() => navigate('/health')} />
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-rose-500 rounded-[2.5rem] p-6 text-white relative overflow-hidden">
                <i className="fas fa-bed absolute top-4 right-4 opacity-30 text-2xl"></i>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Dormir</p>
                <h3 className="text-2xl font-black">22:00</h3>
                <span className="text-xs font-medium opacity-70">pm</span>
             </div>
             <div className="bg-amber-400 rounded-[2.5rem] p-6 text-white relative overflow-hidden">
                <i className="fas fa-bell absolute top-4 right-4 opacity-30 text-2xl"></i>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Acordar</p>
                <h3 className="text-2xl font-black">07:30</h3>
                <span className="text-xs font-medium opacity-70">am</span>
             </div>
          </div>
        </section>

         {/* 7. Seção Social */}
         <section>
          <SectionHeader title="Social" />
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800">
             <div className="flex justify-between items-center">
                {[
                  { label: 'Enquetes', icon: 'fas fa-poll' },
                  { label: 'Sugestões', icon: 'fas fa-heart' },
                  { label: 'Chat AI', icon: 'fas fa-comments' },
                  { label: 'Pesquisas', icon: 'fas fa-edit' },
                ].map((item, idx) => (
                  <button key={idx} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-all flex items-center justify-center text-lg">
                      <i className={item.icon}></i>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{item.label}</span>
                  </button>
                ))}
             </div>
          </div>
        </section>

        {/* 8. IA Recommendations */}
        <section>
          <SectionHeader title="Recomendações IA" />
          <div className="bg-indigo-50 dark:bg-slate-800/60 rounded-[2.5rem] p-6 flex items-center gap-6 relative overflow-hidden">
             {/* Badge do Score */}
             <div className="absolute right-0 top-0 w-24 h-24 bg-cyan-500 shadow-lg shadow-cyan-500/30 rounded-bl-[2.5rem] flex items-center justify-center text-white">
                <div className="text-center -mt-2 -mr-2">
                   <p className="text-2xl font-black">78</p>
                   <p className="text-[8px] font-bold uppercase">Score</p>
                </div>
             </div>

             <div className="flex-1 pr-16">
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Health Score</h3>
                <p className={`text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed mb-4 ${loadingInsight ? 'animate-pulse' : ''}`}>
                  {insight}
                </p>
                <button className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                  Ver Detalhes <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
             </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Dashboard;