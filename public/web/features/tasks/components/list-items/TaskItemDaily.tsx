import React from "react";
import { Task, TaskPriority } from "../../../../domain/tasks.types";

interface TaskItemDailyProps {
  task: Task;
  onToggle: (id: string) => void;
}

/**
 * @author HallTech AI
 * Componente visual para tarefas do tipo "Dia a Dia".
 */
const TaskItemDaily: React.FC<TaskItemDailyProps> = ({ task, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(task.id)}
      className={`p-5 rounded-[2rem] flex items-center gap-5 shadow-sm border-2 active:scale-[0.98] transition-all group cursor-pointer ${
        task.priority === TaskPriority.HIGH
          ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"
          : task.priority === TaskPriority.MEDIUM
          ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
          task.completed
            ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-none"
            : "border-slate-300 dark:border-slate-700"
        }`}
      >
        {task.completed && <i className="fas fa-check text-white text-xs"></i>}
      </div>
      <div className="flex-1">
        <p
          className={`font-bold text-sm ${
            task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100"
          }`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
          title="Editar"
        >
          <i className="fas fa-pen text-sm"></i>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
          title="Excluir"
        >
          <i className="fas fa-trash text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItemDaily;