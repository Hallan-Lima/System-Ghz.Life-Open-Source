import React from "react";
import Layout from "../../../components/Layout";
import SectionHeader from "../../../components/ui/SectionHeader";
import StatCard from "../../../components/ui/StatCard";
import ModuleCard from "../../../components/ui/ModuleCard";
import { useDashboard } from "../hooks/useDashboard";
import { TaskPriority } from "../../../domain/tasks.types";

/**
 * @author HallTech AI
 * View principal do Dashboard.
 * Responsável por organizar o layout utilizando componentes de UI e dados do hook.
 */
const DashboardView: React.FC = () => {
  const { data, handleNavigate } = useDashboard();
  const { tasks } = data;

  return (
    <Layout title="Visão Geral">
      <div className="space-y-10 pb-20">
        
        {/* 1. Módulos Ativos (Horizontal Scroll) */}
        <section className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max px-1 pb-4">
            <ModuleCard
              title="Tarefas"
              icon="fas fa-list-check"
              bg="bg-indigo-500"
              onClick={() => handleNavigate("/tasks")}
            />
          </div>
        </section>

        {/* 2. Cards de Estatísticas (Grid) */}
        <section>
          <SectionHeader
            title="Tarefas, Metas e Objetivos"
            onSeeMore={() => handleNavigate("/tasks")}
          />
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon="fas fa-circle-check"
              label="Concluídas"
              value={tasks.filter(t => t.completed).length.toString()}
              color="text-green-500"
            />
            <StatCard
              icon="fas fa-hourglass-end"
              label="Pendentes"
              value={tasks.filter(t => !t.completed).length.toString()}
              color="text-orange-500"
            />
            <StatCard
              icon="fas fa-flag"
              label="Alta Prioridade"
              value={tasks.filter(t => t.priority === TaskPriority.HIGH).length.toString()}
              color="text-red-500"
            />
            <StatCard
              icon="fas fa-chart-line"
              label="Taxa Conclusão"
              value={`${tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%`}
              color="text-indigo-600"
            />
          </div>
        </section>
        
        {/* 3. Quick Notes Section */}
        <section>
          <SectionHeader 
            title="Anotações Rápidas"
            onSeeMore={() => handleNavigate("/tasks")}
          />
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 group">
                <i className="fas fa-sticky-note text-yellow-500 text-lg mt-1 flex-shrink-0"></i>
                <div className="flex-grow">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Exemplo de anotação rápida salva</p>
                  <p className="text-xs text-slate-400 mt-1">Há 2 horas</p>
                </div>
                <i className="fas fa-edit text-slate-400 hover:text-indigo-600 cursor-pointer mt-1 flex-shrink-0"></i>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <i className="fas fa-sticky-note text-amber-500 text-lg mt-1 flex-shrink-0"></i>
                <div className="flex-grow">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Outra anotação importante</p>
                  <p className="text-xs text-slate-400 mt-1">Ontem</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleNavigate("/tasks/new")}
              className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm uppercase tracking-widest transition-colors"
            >
              + Adicionar Anotação
            </button>
          </div>
        </section>

        {/* Configurar Widths Button */}
        <section className="flex justify-center">
          <button
            onClick={() => handleNavigate("/configurar-widths")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-md active:scale-95"
          >
            Configurar Widths
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default DashboardView;