import React from "react";
import { useTaskCreator } from "../hooks/useTaskCreator";
import { getTaskTypeConfig } from "../tasks.utils";
import TaskTypeSelector from "./creator/TaskTypeSelector";
import TaskFormFields from "./creator/TaskFormFields";
import { TaskType } from "../../../domain/tasks.types";

/**
 * @author HallTech AI
 * View container para o formulário de criação.
 */
const TaskCreatorView: React.FC = () => {
  const { form, actions } = useTaskCreator();
  const { type, title, setTitle } = form;
  const currentConfig = getTaskTypeConfig(type);

  const isNote = type === TaskType.NOTE;
  const isShopping = type === TaskType.SHOPPING;
  const isGoal = type === TaskType.GOAL;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans relative overflow-hidden transition-colors duration-500">
      {/* Background Lights */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${currentConfig.color}-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none transition-colors duration-500`}></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={actions.handleBack}
          className="w-11 h-11 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition-all shadow-sm hover:bg-white dark:hover:bg-slate-800"
        >
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <div className="px-4 py-1.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full border border-slate-200/50 dark:border-slate-700/50">
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Criando {currentConfig.label}
          </span>
        </div>
        <div className="w-11"></div>
      </div>

      <div className="flex-1 px-6 pb-40 overflow-y-auto no-scrollbar relative z-20">
        
        {/* 1. Type Selector */}
        <TaskTypeSelector currentType={type} onSelect={form.setType} />

        {/* 2. Main Input */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="space-y-2 mb-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Título <span className="text-rose-500">*</span>
            </label>
          </div>
          <div className="relative">
            <textarea
              placeholder={isNote ? "Sobre o que é essa nota?" : isShopping ? "O que você quer comprar?" : isGoal ? "O que você quer alcançar?" : "O que você precisa fazer?"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={2}
              className="w-full bg-transparent text-3xl sm:text-4xl font-black text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none resize-none leading-tight tracking-tight"
              autoFocus
            />
            <div className={`h-1 w-20 bg-${currentConfig.color}-500 rounded-full mt-4 opacity-50`}></div>
          </div>
        </div>

        {/* 3. Form Fields */}
        <TaskFormFields form={form} actions={actions} />
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90">
        <button
          onClick={actions.handleSave}
          disabled={!title}
          className={`w-full text-white font-black py-5 rounded-[2rem] shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 relative overflow-hidden group ${
            !title
              ? "bg-slate-400"
              : `bg-${currentConfig.color}-600 shadow-${currentConfig.color}-500/40 hover:bg-${currentConfig.color}-500`
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <span className="relative z-10 text-sm tracking-wide">
            CONFIRMAR {currentConfig.label.toUpperCase()}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center relative z-10">
            <i className="fas fa-arrow-right text-[10px]"></i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TaskCreatorView;