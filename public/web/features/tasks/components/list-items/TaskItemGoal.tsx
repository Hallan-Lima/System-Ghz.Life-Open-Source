import React, { useState } from "react";
import { Task, TaskType } from "../../../../domain/tasks.types";

interface TaskItemGoalProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onUpdateValue?: (id: string, value: number) => void;
}

const ProgressBar = ({
  progress,
  color = "bg-indigo-600",
}: {
  progress: number;
  color?: string;
}) => (
  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3 mb-1 shadow-inner">
    <div
      className={`h-full ${color} transition-all duration-700 ease-out relative`}
      style={{ width: `${Math.min(100, Math.max(0, progress || 0))}%` }}
    >
      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
    </div>
  </div>
);

/**
 * @author HallTech AI
 * Componente visual para Metas e Sonhos (Goals & Dreams).
 * Permite edição rápida do progresso e formatação inteligente baseada na unidade.
 */
const TaskItemGoal: React.FC<TaskItemGoalProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  onUpdateValue,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempValue, setTempValue] = useState(
    task.currentValue?.toString() || "0",
  );

  const isDream = task.type === TaskType.DREAM;
  const mainColor = isDream ? "rose" : "indigo";
  const bgColor = isDream
    ? "bg-rose-50 dark:bg-rose-950/20"
    : "bg-indigo-50 dark:bg-indigo-950/20";
  const iconColor = isDream ? "text-rose-500" : "text-indigo-500";
  const progressColor = isDream ? "bg-rose-500" : "bg-indigo-500";
  const borderColor = isDream
    ? "border-rose-200 dark:border-rose-900/40"
    : "border-indigo-200 dark:border-indigo-900/40";

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleToggleMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(task.currentValue?.toString() || "0");
    setIsUpdating(!isUpdating);
  };

  const handleSaveValue = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();

    const normalizedValue = tempValue.trim().replace(",", ".");
    const numVal = parseFloat(normalizedValue);

    if (!isNaN(numVal) && onUpdateValue) {
      onUpdateValue(task.id, numVal);
      setIsUpdating(false);
    } else {
      setIsUpdating(false);
      setTempValue(task.currentValue?.toString() || "0");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleSaveValue(e);
    } else if (e.key === "Escape") {
      setIsUpdating(false);
      setTempValue(task.currentValue?.toString() || "0");
    }
  };

  // Identifica se é unidade monetária
  const isCurrency = (u?: string) => ["BRL", "USD", "EUR"].includes(u || "");

  // Formata o valor baseado na unidade salva (task.unit)
  const formatValue = (val?: number) => {
    if (val === undefined) return "0";

    const unit = task.unit || "un"; // Fallback para 'un'

    if (isCurrency(unit)) {
      return val.toLocaleString("pt-BR", { style: "currency", currency: unit });
    }

    // Para unidades customizadas (kg, km, livros)
    return `${val} ${unit}`;
  };

  // Ícone/Prefixo para o modo de edição
  const getEditPrefix = () => {
    const unit = task.unit || "un";
    if (unit === "BRL") return "R$";
    if (unit === "USD") return "$";
    if (unit === "EUR") return "€";
    return "#";
  };

  return (
    <div
      className={`relative p-6 rounded-[2.5rem] shadow-sm border transition-all duration-300 ${task.completed ? "opacity-75 grayscale-[0.5]" : ""} ${bgColor} ${borderColor}`}
    >
      {/* Header: Icon & Title */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm bg-white dark:bg-slate-900 ${iconColor}`}
          >
            <i className={isDream ? "fas fa-plane" : "fas fa-bullseye"}></i>
          </div>
          <div>
            <h4 className="font-black text-lg text-slate-800 dark:text-white leading-tight">
              {task.title}
            </h4>
            {task.dueDate && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>
        </div>

        {/* Actions Drop (Edit/Delete) */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleEdit}
            className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <i className="fas fa-pen text-xs"></i>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors"
          >
            <i className="fas fa-trash text-xs"></i>
          </button>
        </div>
      </div>

      {/* Progress Section */}
      {task.targetValue !== undefined && (
        <div className="mt-4 bg-white/60 dark:bg-slate-900/60 p-4 rounded-3xl border border-white/50 dark:border-slate-800 shadow-sm backdrop-blur-sm">
          {/* Header do Progresso */}
          <div className="flex justify-between items-end mb-1">
            <span className={`text-3xl font-black ${iconColor}`}>
              {Math.round(task.progress || 0)}%
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              {Math.round(task.progress || 0) >= 100
                ? "Concluído"
                : "Em Progresso"}
            </span>
          </div>

          <ProgressBar progress={task.progress || 0} color={progressColor} />

          {/* Area de Valores / Input */}
          <div className="mt-3 flex items-center justify-between">
            {!isUpdating ? (
              // VISUALIZAÇÃO PADRÃO
              <>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Atual
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                    {formatValue(task.currentValue)}
                  </span>
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Meta
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                    {formatValue(task.targetValue)}
                  </span>
                </div>

                {/* Botão de Atualizar Rápido */}
                <button
                  onClick={handleToggleMode}
                  className={`ml-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all text-white ${progressColor}`}
                  title="Atualizar valor"
                >
                  <i className="fas fa-plus text-sm"></i>
                </button>
              </>
            ) : (
              // MODO DE EDIÇÃO
              <div className="flex w-full items-center gap-2 animate-in fade-in zoom-in duration-200">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                    {getEditPrefix()}
                  </span>
                  <input
                    type="number"
                    step="any" /* MÁGICA: Permite números decimais sem bugar o navegador */
                    autoFocus
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={handleKeyDown} /* Adicionado evento de teclado */
                    className="w-full bg-white dark:bg-slate-800 border-2 border-indigo-500 rounded-xl py-2 pl-8 pr-2 text-sm font-bold text-slate-800 dark:text-white outline-none"
                  />
                </div>
                <button
                  type="button" /* Proteção contra reload acidental */
                  onClick={handleSaveValue}
                  className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-lg active:scale-95"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  type="button" /* Proteção contra reload acidental */
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUpdating(false);
                  }}
                  className="bg-slate-200 dark:bg-slate-700 text-slate-500 p-2.5 rounded-xl active:scale-95"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItemGoal;
