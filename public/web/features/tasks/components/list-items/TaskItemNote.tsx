import React from "react";
import { Task } from "../../../../domain/tasks.types";

interface TaskItemNoteProps {
  task: Task;
}

/**
 * @author HallTech AI
 * Componente visual para Notas e Anotações.
 */
const TaskItemNote: React.FC<TaskItemNoteProps> = ({ task }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-[1.5rem] shadow-sm border border-yellow-200 dark:border-yellow-800/40 relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-black text-slate-800 dark:text-white text-sm">{task.title}</h4>
        </div>
        <div className="flex-shrink-0 flex justify-end gap-1">
          <button className="px-3 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
            <i className="fas fa-pen text-sm"></i>
          </button>
          <button className="px-3 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
            <i className="fas fa-trash text-sm"></i>
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
        {task.content || "Sem conteúdo"}
      </p>
    </div>
  );
};

export default TaskItemNote;