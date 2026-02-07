import React from "react";
import { Task } from "../../../../domain/tasks.types";

interface TaskItemShoppingProps {
  task: Task;
  onToggle: (id: string) => void;
}

/**
 * @author HallTech AI
 * Componente visual para itens de Lista de Compra.
 */
const TaskItemShopping: React.FC<TaskItemShoppingProps> = ({ task, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(task.id)}
      className="bg-white dark:bg-slate-900 p-4 rounded-[1.5rem] flex items-center justify-between shadow-sm border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            task.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300 dark:border-slate-700"
          }`}
        >
          {task.completed && <i className="fas fa-check text-white text-[10px]"></i>}
        </div>
        <div>
          <p
            className={`font-bold text-sm ${
              task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100"
            }`}
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
        <button className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
          <i className="fas fa-pen text-sm"></i>
        </button>
        <button className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
          <i className="fas fa-trash text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItemShopping;