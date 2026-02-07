import React from "react";
import { TaskType } from "../../../domain/tasks.types";

interface TaskTabsProps {
  activeTab: TaskType;
  onTabChange: (tab: TaskType) => void;
  config: {
    enableGoals: boolean;
    enableShopping: boolean;
    enableNotes: boolean;
  };
}

/**
 * @author HallTech AI
 * Abas de navegação para alternar entre contextos de tarefas (Diário, Metas, Compras, Notas).
 */
const TaskTabs: React.FC<TaskTabsProps> = ({ activeTab, onTabChange, config }) => {
  const getButtonClass = (isActive: boolean) =>
    `flex-shrink-0 px-6 py-3 rounded-[2rem] font-black text-xs uppercase tracking-wider transition-all border ${
      isActive
        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
        : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
    }`;

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
      <button
        onClick={() => onTabChange(TaskType.DAILY)}
        className={getButtonClass(activeTab === TaskType.DAILY)}
      >
        <i className="fas fa-check-double mr-2"></i> Dia a Dia
      </button>

      {config.enableGoals && (
        <button
          onClick={() => onTabChange(TaskType.GOAL)}
          className={getButtonClass(activeTab === TaskType.GOAL)}
        >
          <i className="fas fa-bullseye mr-2"></i> Metas & Sonhos
        </button>
      )}

      {config.enableShopping && (
        <button
          onClick={() => onTabChange(TaskType.SHOPPING)}
          className={getButtonClass(activeTab === TaskType.SHOPPING)}
        >
          <i className="fas fa-cart-shopping mr-2"></i> Listas & Compras
        </button>
      )}

      {config.enableNotes && (
        <button
          onClick={() => onTabChange(TaskType.NOTE)}
          className={getButtonClass(activeTab === TaskType.NOTE)}
        >
          <i className="fas fa-sticky-note mr-2"></i> Anotações
        </button>
      )}
    </div>
  );
};

export default TaskTabs;