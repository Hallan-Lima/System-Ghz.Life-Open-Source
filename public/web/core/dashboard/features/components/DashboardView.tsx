import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/shared/ui/layout/Layout";
import SectionHeader from "@/shared/ui/SectionHeader";
import ModuleCard from '@/shared/ui/ModuleCard';
import { useDashboard } from '@/core/dashboard/features/hooks/useDashboard';
import { useModules } from '@/core/modules/features/modules/hooks/useModules'; // Importação do contexto de módulos
import { TaskPriority, TaskType } from "@/modules/tasks/domain/tasks.types";

/**
 * @author HallTech AI
 * View principal do Dashboard.
 * UI Refinada com Bento Grid e Glassmorphism.
 * Adapta-se dinamicamente aos módulos ativos.
 */
const DashboardView: React.FC = () => {
  const { data, handleNavigate, loadingTasks } = useDashboard();
  const { tasks } = data;
  const { modules, loading: loadingModules } = useModules();
  const navigate = useNavigate();

  // --- Verificação de Módulos ---
  // Substituímos os textos pelos IDs numéricos que vêm do banco
  const isProductivityEnabled = modules.find(m => m.id === '1')?.isEnabled ?? false;
  const isFinanceEnabled = modules.find(m => m.id === '2')?.isEnabled ?? false;
  const isHealthEnabled = modules.find(m => m.id === '3')?.isEnabled ?? false;

  // Verifica features específicas de Produtividade (Módulo 1)
  const productivityFeatures = modules.find(m => m.id === '1')?.features || [];
  
  // A feature de "Anotações" no seu banco agora tem o ID '5'
  const isNotesEnabled = productivityFeatures.find(f => f.id === '5')?.isEnabled ?? false;
  
  // Cálculos Dinâmicos
  const pendingTasks = tasks.filter(t => !t.completed && t.type !== TaskType.NOTE);
  const completedTasks = tasks.filter(t => t.completed && t.type !== TaskType.NOTE);
  const highPriorityPending = pendingTasks.filter(t => t.priority === TaskPriority.HIGH);
  const notes = tasks.filter(t => t.type === TaskType.NOTE);

  const totalTasks = pendingTasks.length + completedTasks.length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks.length / totalTasks) * 100) 
    : 0;

  return (
    <Layout title="Visão Geral">
      <div className="space-y-8 pb-24">
        
        {/* 1. Módulos Ativos (Horizontal Scroll) */}
        <section className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-3 min-w-max pb-2">
            {isProductivityEnabled && (
                <ModuleCard
                title="Tarefas"
                icon="fas fa-list-check"
                bg="bg-indigo-600"
                onClick={() => handleNavigate("/tasks")}
                />
            )}
            {isFinanceEnabled && (
                <ModuleCard
                title="Finanças"
                icon="fas fa-wallet"
                bg="bg-emerald-600"
                onClick={() => handleNavigate("/finance")}
                />
            )}
            {isHealthEnabled && (
                <ModuleCard
                title="Saúde"
                icon="fas fa-heartbeat"
                bg="bg-rose-500"
                onClick={() => handleNavigate("/health")}
                />
            )}
            
            {/* Atalho para configurar se poucos módulos estiverem ativos */}
            {(!isProductivityEnabled || !isFinanceEnabled || !isHealthEnabled) && (
                 <ModuleCard
                 title="Ativar +"
                 icon="fas fa-plus-circle"
                 bg="bg-slate-400 dark:bg-slate-700"
                 onClick={() => handleNavigate("/modules")}
                 />
            )}
          </div>
        </section>

        {/* 2. Cards de Estatísticas (Bento Grid Layout) - Só exibe se Produtividade ativa */}
        {isProductivityEnabled && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SectionHeader
                title="Produtividade"
                onSeeMore={() => handleNavigate("/tasks")}
            />
            
            {loadingTasks ? (
                <div className="h-40 bg-slate-100 dark:bg-slate-900 rounded-[2rem] animate-pulse"></div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {/* Card 1: Pendentes (Destaque Principal) */}
                    <div 
                        onClick={() => navigate('/tasks?type=DAILY')}
                        className="col-span-2 bg-slate-900 dark:bg-indigo-600 p-6 rounded-[2rem] text-white relative overflow-hidden shadow-lg active:scale-[0.99] transition-all cursor-pointer"
                    >
                        <div className="absolute right-0 top-0 p-6 opacity-10">
                            <i className="fas fa-hourglass-half text-6xl"></i>
                        </div>
                        <div className="relative z-10 flex flex-col justify-between h-full gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <i className="fas fa-list-ul text-xs"></i>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Pendentes</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <h3 className="text-4xl font-black tracking-tighter">{pendingTasks.length}</h3>
                                <span className="text-sm font-medium mb-1.5 opacity-60">tarefas ativas</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Alta Prioridade (Alerta) */}
                    <div 
                        onClick={() => navigate('/tasks')}
                        className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-[2rem] border border-rose-100 dark:border-rose-900/50 flex flex-col justify-between gap-3 active:scale-95 transition-all cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-500 flex items-center justify-center">
                            <i className="fas fa-flag text-xs"></i>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-rose-600 dark:text-rose-400">{highPriorityPending.length}</h4>
                            <p className="text-[10px] font-bold text-rose-400 dark:text-rose-500 uppercase tracking-wide leading-tight">Alta Prioridade</p>
                        </div>
                    </div>

                    {/* Card 3: Taxa de Conclusão (Gráfico) */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-between gap-3 relative overflow-hidden">
                        <div className="absolute right-3 top-3">
                            <i className="fas fa-chart-pie text-slate-100 dark:text-slate-800 text-4xl"></i>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center relative z-10">
                            <i className="fas fa-check text-xs"></i>
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-black text-slate-800 dark:text-white">{completionRate}%</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-tight">Conclusão</p>
                        </div>
                        {/* Progress Bar Mini */}
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-1">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${completionRate}%` }}></div>
                        </div>
                    </div>
                </div>
            )}
            </section>
        )}
        
        {/* 3. Quick Notes Section - Só exibe se Produtividade E Notas ativos */}
        {isProductivityEnabled && isNotesEnabled && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SectionHeader 
                title="Anotações Rápidas"
                onSeeMore={() => navigate("/tasks?type=NOTE")}
            />
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                {/* Card de Adicionar Nova Nota */}
                <button
                    onClick={() => navigate("/tasks/new", { state: { defaultType: "NOTE" } })}
                    className="flex-shrink-0 w-32 h-32 rounded-[1.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all active:scale-95"
                >
                    <i className="fas fa-plus text-xl"></i>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Nova Nota</span>
                </button>

                {/* Lista de Notas Recentes */}
                {notes.length > 0 ? (
                    notes.slice(0, 5).map(note => (
                        <div 
                            key={note.id}
                            onClick={() => navigate("/tasks/new", { state: { taskToEdit: note } })}
                            className={`flex-shrink-0 w-40 h-32 rounded-[1.5rem] p-4 flex flex-col justify-between shadow-sm cursor-pointer active:scale-95 transition-all relative overflow-hidden group ${
                                note.isPinned 
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100' 
                                : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800'
                            }`}
                        >
                            {note.isPinned && (
                                <i className="fas fa-thumbtack absolute top-3 right-3 text-amber-500/50 text-xs rotate-45"></i>
                            )}
                            <p className={`text-xs font-bold line-clamp-4 leading-relaxed ${note.isPinned ? '' : 'text-slate-600 dark:text-slate-300'}`}>
                                {note.content || note.title}
                            </p>
                            <p className={`text-[9px] font-black uppercase tracking-widest mt-2 ${note.isPinned ? 'text-amber-600/60' : 'text-slate-300'}`}>
                                {note.isPinned ? 'Fixado' : 'Ver nota'}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center gap-3 px-4 text-slate-400 text-xs italic">
                        Nenhuma anotação recente.
                    </div>
                )}
            </div>
            </section>
        )}

      </div>
    </Layout>
  );
};

export default DashboardView;
