import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { Task, TaskPriority, TaskType } from "../domain/types";

// Mock Data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Estudar React Native",
    completed: false,
    priority: TaskPriority.HIGH,
    type: TaskType.DAILY,
    content: "Revisar hooks e navegação",
  },
  {
    id: "2",
    title: "Ir na Academia",
    completed: true,
    priority: TaskPriority.MEDIUM,
    type: TaskType.DAILY,
    content: "Treino de pernas e cardio",
  },
  {
    id: "3",
    title: "Organizar Desk",
    completed: false,
    priority: TaskPriority.LOW,
    type: TaskType.DAILY,
    content: "Limpar poeira e organizar cabos",
  },
  // Goals
  {
    id: "4",
    title: "Viagem para Europa",
    completed: false,
    priority: TaskPriority.HIGH,
    type: TaskType.DREAM,
    progress: 35,
    targetValue: 15000,
    currentValue: 5250,
    dueDate: "2025-12-01",
    content: "Economizar para a viagem dos sonhos",
  },
  {
    id: "5",
    title: "Ler 12 Livros",
    completed: false,
    priority: TaskPriority.MEDIUM,
    type: TaskType.GOAL,
    progress: 50,
    targetValue: 12,
    currentValue: 6,
    content: "Aprimorar conhecimentos e habilidades",
  },
  // Shopping
  {
    id: "6",
    title: "Fone de Ouvido Novo",
    completed: false,
    priority: TaskPriority.LOW,
    type: TaskType.SHOPPING,
    estimatedCost: 350,
    content: "Procurar por modelos com cancelamento de ruído",
  },
  {
    id: "7",
    title: "Monitor 4k",
    completed: true,
    priority: TaskPriority.HIGH,
    type: TaskType.SHOPPING,
    estimatedCost: 2000,
    content: "Comprar monitor para melhorar produtividade",
  },
];

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TaskType>(TaskType.DAILY);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);

  // Configuration State (In a real app, this comes from User Context/Auth)
  const [config, setConfig] = useState({
    enableGoals: true,
    enableShopping: true,
  });

  // Derived state for display
  const currentTasks = taskList
    .filter((t) => {
      // Filter by type
      if (activeTab === TaskType.DAILY && t.type === TaskType.DAILY)
        return true;
      if (
        activeTab === TaskType.GOAL &&
        (t.type === TaskType.GOAL || t.type === TaskType.DREAM)
      )
        return true;
      if (activeTab === TaskType.SHOPPING && t.type === TaskType.SHOPPING)
        return true;
      return false;
    })
    .filter((t) => {
      // Filter by status
      if (filter === "all") return true;
      if (filter === "done") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });

  const toggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // --- Subcomponents ---

  const ProgressBar = ({
    progress,
    color = "bg-indigo-600",
  }: {
    progress: number;
    color?: string;
  }) => (
    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
      <div
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${Math.min(100, progress)}%` }}
      ></div>
    </div>
  );

  return (
    <Layout title="Produtividade">
      <div className="space-y-6">
        {/* Navigation Tabs (Context Switcher) */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setActiveTab(TaskType.DAILY)}
            className={`flex-shrink-0 px-6 py-3 rounded-[2rem] font-black text-xs uppercase tracking-wider transition-all border ${
              activeTab === TaskType.DAILY
                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
                : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
            }`}
          >
            <i className="fas fa-check-double mr-2"></i> Dia a Dia
          </button>

          {config.enableGoals && (
            <button
              onClick={() => setActiveTab(TaskType.GOAL)}
              className={`flex-shrink-0 px-6 py-3 rounded-[2rem] font-black text-xs uppercase tracking-wider transition-all border ${
                activeTab === TaskType.GOAL
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              <i className="fas fa-bullseye mr-2"></i> Metas & Sonhos
            </button>
          )}

          {config.enableShopping && (
            <button
              onClick={() => setActiveTab(TaskType.SHOPPING)}
              className={`flex-shrink-0 px-6 py-3 rounded-[2rem] font-black text-xs uppercase tracking-wider transition-all border ${
                activeTab === TaskType.SHOPPING
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
              }`}
            >
              <i className="fas fa-cart-shopping mr-2"></i> Listas & Compras
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex bg-slate-200/50 dark:bg-slate-900 p-1.5 rounded-2xl">
          {["all", "pending", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500"}`}
            >
              {f === "all"
                ? "Todos"
                : f === "pending"
                  ? "Pendentes"
                  : "Concluídos"}
            </button>
          ))}
        </div>

        {/* Content Area - Changes based on Active Tab */}
        <div className="space-y-4">
          {currentTasks.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <i className="fas fa-clipboard-list text-2xl"></i>
              </div>
              <p className="text-slate-400 font-bold text-sm">
                Nenhum item encontrado.
              </p>
            </div>
          )}

          {/* VIEW: DAILY TASKS */}
          {activeTab === TaskType.DAILY &&
            currentTasks.map((task: Task) => (
              <div
                key={task.id}
                className={`p-5 rounded-[2rem] flex items-center gap-5 shadow-sm border-2 active:scale-[0.98] transition-all group cursor-pointer ${
                  task.priority === TaskPriority.HIGH
                    ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"
                    : task.priority === TaskPriority.MEDIUM
                      ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${task.completed ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-none" : "border-slate-300 dark:border-slate-700"}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed && (
                    <i className="fas fa-check text-white text-xs"></i>
                  )}
                </div>
                <div className="flex-1" onClick={() => toggleTask(task.id)}>
                  <p
                    className={`font-bold text-sm ${task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100"}`}
                  >
                    {task.title}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                    title="Editar"
                  >
                    <i className="fas fa-pen text-sm"></i>
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all"
                    title="Arquivar"
                  >
                    <i className="fas fa-archive text-sm"></i>
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
                    title="Excluir"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            ))}

          {/* VIEW: GOALS & DREAMS */}
          {activeTab === TaskType.GOAL &&
            currentTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${task.type === TaskType.DREAM ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"}`}
                    >
                      <i
                        className={
                          task.type === TaskType.DREAM
                            ? "fas fa-plane"
                            : "fas fa-book"
                        }
                      ></i>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 dark:text-white">
                        {task.title}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {task.dueDate ? `Prazo: ${task.dueDate}` : "Sem prazo"}
                      </p>
                    </div>
                  </div>
                  {task.targetValue && (
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Meta
                      </p>
                      <p className="font-black text-indigo-600">
                        {task.type === TaskType.DREAM
                          ? `R$ ${task.targetValue}`
                          : task.targetValue}
                      </p>
                    </div>
                  )}
                </div>

                {typeof task.progress === "number" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">
                        {task.progress}% Concluído
                      </span>
                      <span className="text-slate-800 dark:text-white">
                        {task.currentValue} / {task.targetValue}
                      </span>
                    </div>
                    <ProgressBar
                      progress={task.progress}
                      color={
                        task.type === TaskType.DREAM
                          ? "bg-rose-500"
                          : "bg-indigo-600"
                      }
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                    title="Editar"
                  >
                    <i className="fas fa-pen text-sm"></i>
                  </button>
                <button
                    onClick={() => toggleTask(task.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${task.completed ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"}`}
                    title="Concluir"
                >
                    <i className="fas fa-check text-sm"></i>
                </button>
                  <button
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all"
                    title="Arquivar"
                  >
                    <i className="fas fa-archive text-sm"></i>
                  </button>
                  <button
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
                    title="Excluir"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            ))}

          {/* VIEW: SHOPPING / ACQUISITIONS */}
          {activeTab === TaskType.SHOPPING &&
            currentTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-[1.5rem] flex items-center justify-between shadow-sm border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div
                  className="flex items-center gap-4 flex-1"
                  onClick={() => toggleTask(task.id)}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300 dark:border-slate-700"}`}
                  >
                    {task.completed && (
                      <i className="fas fa-check text-white text-[10px]"></i>
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-bold text-sm ${task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100"}`}
                    >
                      {task.title}
                    </p>
                    {task.estimatedCost && (
                      <p className="text-[10px] font-bold text-emerald-600 mt-0.5">
                        Est. R$ {task.estimatedCost}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                    title="Editar"
                  >
                    <i className="fas fa-pen text-sm"></i>
                  </button>
                  <button
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all"
                    title="Arquivar"
                  >
                    <i className="fas fa-archive text-sm"></i>
                  </button>
                  <button
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
                    title="Excluir"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] z-40">
        <button
          onClick={() =>
            navigate("/tasks/new", { state: { defaultType: activeTab } })
          }
          className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl shadow-xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <i className="fas fa-plus"></i>
          {activeTab === TaskType.DAILY
            ? "Nova Tarefa"
            : activeTab === TaskType.GOAL
              ? "Nova Meta"
              : "Novo Item"}
        </button>
      </div>

      {/* Simulation of Configuration Toggle (Dev Mode) */}
      <div className="mt-20 p-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest mb-4">
          Configuração do Módulo (Simulação)
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() =>
              setConfig((prev) => ({ ...prev, enableGoals: !prev.enableGoals }))
            }
            className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${config.enableGoals ? "bg-indigo-100 text-indigo-600 border-indigo-200" : "text-slate-400 border-slate-200"}`}
          >
            Goals: {config.enableGoals ? "ON" : "OFF"}
          </button>
          <button
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                enableShopping: !prev.enableShopping,
              }))
            }
            className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${config.enableShopping ? "bg-indigo-100 text-indigo-600 border-indigo-200" : "text-slate-400 border-slate-200"}`}
          >
            Shopping: {config.enableShopping ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
