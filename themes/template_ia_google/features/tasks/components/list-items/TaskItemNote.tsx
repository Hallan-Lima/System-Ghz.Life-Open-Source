import React from "react";
import { Task } from "../../../../domain/tasks.types";

interface TaskItemNoteProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onArchive: () => void; // Funciona como o Toggle/Concluir
  onPin: () => void;
}

/**
 * @author HallTech AI
 * Componente visual para Notas e Anotações.
 * Suporta Fixar, Arquivar e Excluir.
 */
const TaskItemNote: React.FC<TaskItemNoteProps> = ({ task, onDelete, onEdit, onArchive, onPin }) => {
  return (
    <div 
      className={`relative p-6 rounded-[1.5rem] shadow-sm border overflow-hidden transition-all duration-300 ${
        task.isPinned
          ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
          : "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border-yellow-200 dark:border-yellow-800/40"
      }`}
    >
      {/* Indicador de Fixado */}
      {task.isPinned && (
        <div className="absolute top-0 right-0 p-2">
            <i className="fas fa-thumbtack text-amber-400 opacity-50 text-xs transform rotate-45"></i>
        </div>
      )}

      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex-1">
          <h4 className="font-black text-slate-800 dark:text-white text-sm line-clamp-1">{task.title}</h4>
        </div>
        
        {/* Actions Toolbar */}
        <div className="flex-shrink-0 flex items-center justify-end gap-1">
            {/* Botão Fixar */}
            <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPin(); }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    task.isPinned 
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" 
                    : "bg-white/50 dark:bg-slate-800/50 text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                }`}
                title={task.isPinned ? "Desafixar" : "Fixar"}
            >
                <i className="fas fa-thumbtack text-xs pointer-events-none"></i>
            </button>

            {/* Botão Editar */}
            <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
                className="w-8 h-8 bg-white/50 dark:bg-slate-800/50 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all active:scale-95 flex items-center justify-center"
                title="Editar"
            >
                <i className="fas fa-pen text-xs pointer-events-none"></i>
            </button>

            {/* Botão Arquivar (Toggle Completed) */}
            <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onArchive(); }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    task.completed
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
                    : "bg-white/50 dark:bg-slate-800/50 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                }`}
                title={task.completed ? "Desarquivar" : "Arquivar"}
            >
                <i className="fas fa-box-archive text-xs pointer-events-none"></i>
            </button>

            {/* Botão Excluir (Lixeira) */}
            <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
                className="w-8 h-8 bg-white/50 dark:bg-slate-800/50 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all active:scale-95 flex items-center justify-center"
                title="Excluir Permanentemente"
            >
                <i className="fas fa-trash text-xs pointer-events-none"></i>
            </button>
        </div>
      </div>

      <p className={`text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-1 whitespace-pre-wrap ${task.completed ? "line-through opacity-50" : ""}`}>
        {task.content || task.notes || "Sem conteúdo"}
      </p>

      {task.completed && (
        <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800/50">
             <i className="fas fa-box-archive text-[10px] text-slate-400"></i>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Arquivado</span>
        </div>
      )}
    </div>
  );
};

export default TaskItemNote;