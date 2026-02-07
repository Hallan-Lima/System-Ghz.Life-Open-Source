import React from "react";

interface TaskConfigPanelProps {
  config: {
    enableGoals: boolean;
    enableShopping: boolean;
    enableNotes: boolean;
  };
  onToggle: (key: "enableGoals" | "enableShopping" | "enableNotes") => void;
}

/**
 * @author HallTech AI
 * Painel de simulação para configurar módulos ativos.
 */
const TaskConfigPanel: React.FC<TaskConfigPanelProps> = ({ config, onToggle }) => {
  return (
    <div className="mt-20 p-4 border-t border-slate-200 dark:border-slate-800">
      <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest mb-4">
        Configuração do Módulo (Simulação)
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onToggle("enableGoals")}
          className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${
            config.enableGoals
              ? "bg-indigo-100 text-indigo-600 border-indigo-200"
              : "text-slate-400 border-slate-200"
          }`}
        >
          Goals: {config.enableGoals ? "ON" : "OFF"}
        </button>
        <button
          onClick={() => onToggle("enableShopping")}
          className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${
            config.enableShopping
              ? "bg-indigo-100 text-indigo-600 border-indigo-200"
              : "text-slate-400 border-slate-200"
          }`}
        >
          Shopping: {config.enableShopping ? "ON" : "OFF"}
        </button>
        <button
          onClick={() => onToggle("enableNotes")}
          className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${
            config.enableNotes
              ? "bg-indigo-100 text-indigo-600 border-indigo-200"
              : "text-slate-400 border-slate-200"
          }`}
        >
          Notes: {config.enableNotes ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
};

export default TaskConfigPanel;