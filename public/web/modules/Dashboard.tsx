import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { getGhzAssistantInsights } from "../services/geminiService";
import {
  Transaction,
  Task,
  TransactionType,
  TaskPriority,
  HealthStats,
  TaskType,
} from "../domain/types";

// --- Mock Data ---
const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Assinatura",
    amount: 0.99,
    type: TransactionType.EXPENSE,
    category: "App",
    date: "2023-10-25",
  },
];
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Reunião TCC",
    completed: false,
    priority: TaskPriority.HIGH,
    dueDate: "2023-10-30",
    type: TaskType.DAILY,
  },
];
const mockHealth: HealthStats = { waterIntake: 1.6, waterGoal: 2.0 };

// --- Sub-components for UI Consistency ---

const SectionHeader: React.FC<{ title: string; onSeeMore?: () => void }> = ({
  title,
  onSeeMore,
}) => (
  <div className="flex justify-between items-center mb-4 px-1">
    <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">
      {title}
    </h2>
    {onSeeMore && (
      <button
        onClick={onSeeMore}
        className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
      >
        Ver Mais
      </button>
    )}
  </div>
);

const StatCard: React.FC<{
  icon: string;
  label: string;
  value: string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-xl font-black text-slate-800 dark:text-white">
          {value}
        </p>
      </div>
      <div className={`text-xl ${color} opacity-80 group-hover:scale-110 transition-transform`}>
        <i className={icon}></i>
      </div>
    </div>
  </div>
);

const ModuleCard: React.FC<{
  title: string;
  icon: string;
  bg: string;
  onClick: () => void;
}> = ({ title, icon, bg, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 w-36 h-24 ${bg} rounded-3xl p-4 flex flex-col justify-between text-left relative overflow-hidden shadow-lg active:scale-95 transition-all`}
  >
    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs">
      <i className="fas fa-arrow-right -rotate-45"></i>
    </div>
    <span className="text-white font-black text-sm relative z-10">{title}</span>
    <i
      className={`${icon} absolute -bottom-2 -right-2 text-6xl text-white/20`}
    ></i>
  </button>
);

const CircularProgress: React.FC<{
  percentage: number;
  color: string;
  size?: number;
}> = ({ percentage, color, size = 120 }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-black text-slate-800 dark:text-white">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<string>("Analisando dados...");
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    getGhzAssistantInsights(mockTransactions, mockTasks, mockHealth).then(
      (res) => {
        setInsight(res);
        setLoadingInsight(false);
      },
    );
  }, []);

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
              onClick={() => navigate("/tasks")}
            />
          </div>
        </section>

        {/* 2. Cards de Estatísticas (Grid) */}
        <section>
          <SectionHeader
            title="Tarefas, Metas e Objetivos"
            onSeeMore={() => navigate("/tasks")}
          />
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon="fas fa-circle-check"
              label="Concluídas"
              value={mockTasks.filter(t => t.completed).length.toString()}
              color="text-green-500"
            />
            <StatCard
              icon="fas fa-hourglass-end"
              label="Pendentes"
              value={mockTasks.filter(t => !t.completed).length.toString()}
              color="text-orange-500"
            />
            <StatCard
              icon="fas fa-flag"
              label="Alta Prioridade"
              value={mockTasks.filter(t => t.priority === TaskPriority.HIGH).length.toString()}
              color="text-red-500"
            />
            <StatCard
              icon="fas fa-chart-line"
              label="Taxa Conclusão"
              value={`${Math.round((mockTasks.filter(t => t.completed).length / mockTasks.length) * 100)}%`}
              color="text-indigo-600"
            />
          </div>
        </section>
        
        {/* 3. Quick Notes Section */}
        <section>
          <SectionHeader 
            title="Anotações Rápidas"
            onSeeMore={() => navigate("/tasks")}
          />
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <i className="fas fa-sticky-note text-yellow-500 text-lg mt-1 flex-shrink-0"></i>
                <div className="flex-grow">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Exemplo de anotação rápida salva</p>
                  <p className="text-xs text-slate-400 mt-1">Há 2 horas</p>
                </div>
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
              onClick={() => navigate("/tasks")}
              className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm uppercase tracking-widest transition-colors"
            >
              + Adicionar Anotação
            </button>
          </div>
        </section>

        {/* Configurar Widths Button */}
        <section className="flex justify-center">
          <button
            onClick={() => navigate("/configurar-widths")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-md active:scale-95"
          >
            Configurar Widths
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
