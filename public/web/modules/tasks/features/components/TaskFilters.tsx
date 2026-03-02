import React from "react";
import { TaskType } from "@/modules/tasks/domain/tasks.types";

type FilterType = "all" | "pending" | "done";

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeTab?: TaskType;
}

/**
 * @author HallTech AI
 * Botões de filtro (Todos, Pendentes, Concluídos/Arquivados).
 */
const TaskFilters: React.FC<TaskFiltersProps> = ({ currentFilter, onFilterChange, activeTab }) => {
  const isNoteContext = activeTab === TaskType.NOTE;

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "pending", label: "Pendentes" },
    { key: "done", label: isNoteContext ? "Arquivados" : "Concluídos" },
  ];

  return (
    <div className="flex bg-slate-200/50 dark:bg-slate-900 p-1.5 rounded-2xl">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            currentFilter === f.key
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-500"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;