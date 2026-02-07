import React from "react";
import { Task, TaskType } from "../../../../domain/tasks.types";

interface TaskItemGoalProps {
  task: Task;
  onToggle: (id: string) => void;
}

const ProgressBar = ({ progress, color = "bg-indigo-600" }: { progress: number; color?: string }) => (
  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
    <div
      className={`h-full ${color} transition-all duration-500`}
      style={{ width: `${Math.min(100, progress)}%` }}
    ></div>
  </div>
);

/**
 * @author HallTech AI
 * Componente visual para Metas e Sonhos (Goals & Dreams).
 */
const TaskItemGoal: React.FC<TaskItemGoalProps> = ({ task, onToggle }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${
              task.type === TaskType.DREAM ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"
            }`}
          >
            <i className={task.type === TaskType.DREAM ? "fas fa-plane" : "fas fa-book"}></i>
          </div>
          <div>
            <h4 className="font-black text-slate-800 dark:text-white">{task.title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {task.dueDate ? `Prazo: ${task.dueDate}` : "Sem prazo"}
            </p>
          </div>
        </div>
        {task.targetValue && (
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Meta</p>
            <p className="font-black text-indigo-600">
              {task.type === TaskType.DREAM ? `R$ ${task.targetValue}` : task.targetValue}
            </p>
          </div>
        )}
      </div>

      {typeof task.progress === "number" && (
        <div className="mt-2">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-500">{task.progress}% Concluído</span>
            <span className="text-slate-800 dark:text-white">
              {task.currentValue} / {task.targetValue}
            </span>
          </div>
          <ProgressBar
            progress={task.progress}
            color={task.type === TaskType.DREAM ? "bg-rose-500" : "bg-indigo-600"}
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
          onClick={() => onToggle(task.id)}
          className={`px-3 py-2 rounded-lg text-sm transition-all ${
            task.completed
              ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600"
              : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
          }`}
          title="Concluir"
        >
          <i className="fas fa-check text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItemGoal;