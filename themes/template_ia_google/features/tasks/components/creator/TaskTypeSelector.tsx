import React from "react";
import { TaskType } from "../../../../domain/tasks.types";
import { getTaskTypeConfig } from "../../tasks.utils";

interface TaskTypeSelectorProps {
  currentType: TaskType;
  onSelect: (t: TaskType) => void;
}

/**
 * @author HallTech AI
 * Seletor de tipo de tarefa em formato de carrossel.
 */
const TaskTypeSelector: React.FC<TaskTypeSelectorProps> = ({ currentType, onSelect }) => {
  return (
    <div className="mb-10">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6 snap-x">
        {[
          TaskType.DAILY,
          TaskType.NOTE,
          TaskType.GOAL,
          TaskType.DREAM,
          TaskType.SHOPPING,
        ].map((t) => {
          const config = getTaskTypeConfig(t);
          const isActive = currentType === t;
          return (
            <button
              key={t}
              onClick={() => onSelect(t)}
              className={`snap-center flex-shrink-0 relative w-28 h-36 rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center gap-3 overflow-hidden group border ${
                isActive
                  ? `bg-white border-white shadow-2xl shadow-${config.color}-500/30 scale-100 ring-4 ring-white/10 dark:ring-black/10 z-10`
                  : "bg-white/5 dark:bg-slate-800/30 border-transparent scale-95 opacity-60 hover:opacity-100 hover:bg-white/10"
              }`}
            >
              {isActive && (
                <div
                  className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-${config.color}-50 to-transparent opacity-50`}
                ></div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all shadow-sm relative z-10 ${
                  isActive
                    ? `bg-${config.color}-500 text-white shadow-lg`
                    : "bg-slate-200/20 dark:bg-slate-700/50 text-slate-400"
                }`}
              >
                <i className={config.icon}></i>
              </div>

              <div className="text-center relative z-10">
                <p
                  className={`text-xs font-black uppercase tracking-tight ${isActive ? "text-slate-800" : "text-slate-400"}`}
                >
                  {config.label}
                </p>
                <p
                  className={`text-[9px] font-bold mt-1 ${isActive ? "text-slate-400" : "text-slate-500"}`}
                >
                  {config.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskTypeSelector;