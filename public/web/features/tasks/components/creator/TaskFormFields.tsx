import React from "react";
import { TaskType, TaskPriority, RecurrenceInterval } from "../../../../domain/tasks.types";
import { getNecessityLabel, getSatisfactionLabel, getFrequencyLabel } from "../../tasks.utils";

interface TaskFormFieldsProps {
  form: any;
  actions: any;
}

/**
 * @author HallTech AI
 * Container dos campos de formulário que mudam dinamicamente baseados no tipo.
 */
const TaskFormFields: React.FC<TaskFormFieldsProps> = ({ form, actions }) => {
  const {
    type, cost, setCost, targetValue, setTargetValue, unit, setUnit,
    recurrence, setRecurrence, dueDate, setDueDate,
    priorityMode, setPriorityMode, priority, setPriority,
    necessity, setNecessity, satisfaction, setSatisfaction, frequency, setFrequency,
    tags, tagInput, setTagInput, notes, setNotes
  } = form;

  const { handleAddTag, removeTag } = actions;
  
  const isShopping = type === TaskType.SHOPPING;
  const isNote = type === TaskType.NOTE;

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-[2.5rem] p-1 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
      <div className="p-6 space-y-8">
        
        {/* SHOPPING: Valor Estimado */}
        {isShopping && (
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Valor Estimado
            </label>
            <div className="relative group">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-2xl group-focus-within:scale-110 transition-transform">
                R$
              </span>
              <input
                type="number"
                placeholder="0,00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full bg-transparent text-3xl font-black text-slate-800 dark:text-white pl-10 border-b border-slate-200 dark:border-slate-700 focus:border-emerald-500 outline-none pb-2 transition-colors placeholder:text-slate-300"
              />
            </div>
          </div>
        )}

        {/* GOALS/DREAMS: Meta e Unidade */}
        {(type === TaskType.GOAL || type === TaskType.DREAM) && (
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Meta
              </label>
              <input
                type="number"
                placeholder="100"
                min="1"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xl font-bold p-4 rounded-2xl border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="col-span-2 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Unidade
              </label>
              {type === TaskType.DREAM ? (
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xl font-bold p-4 rounded-2xl border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Selecionar</option>
                  <option value="BRL">🇧🇷 Real (R$)</option>
                  <option value="USD">🇺🇸 Dólar ($)</option>
                  <option value="EUR">🇪🇺 Euro (€)</option>
                  <option value="BTC">₿ Bitcoin</option>
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Kg, Km..."
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xl font-bold p-4 rounded-2xl border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-center"
                />
              )}
            </div>
          </div>
        )}

        {/* DAILY: Recorrência */}
        {type === TaskType.DAILY && (
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Repetição
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {[
                { val: "none", label: "Não repetir", icon: "fas fa-ban" },
                { val: "daily", label: "Diariamente", icon: "fas fa-calendar-day" },
                { val: "weekly", label: "Semanalmente", icon: "fas fa-calendar-week" },
                { val: "monthly", label: "Mensalmente", icon: "fas fa-calendar" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setRecurrence(opt.val as RecurrenceInterval)}
                  className={`flex-shrink-0 px-4 py-3 rounded-2xl border flex items-center gap-2 transition-all ${
                    recurrence === opt.val
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                      : "bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <i className={`${opt.icon} text-xs`}></i>
                  <span className="text-xs font-bold whitespace-nowrap">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Data (exceto Shopping/Note) */}
        {!isShopping && !isNote && (
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Prazo Final
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center group-focus-within:bg-indigo-500 group-focus-within:text-white transition-all">
                <i className="far fa-calendar-alt text-sm"></i>
              </div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-bold p-4 pl-16 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none"
              />
            </div>
          </div>
        )}

        {/* Prioridade e Calibração */}
        {!isShopping && !isNote && (
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Definição de Prioridade
              </label>

              {/* Toggle Switch - Apenas para Metas */}
              {type === TaskType.GOAL && (
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex text-[10px] font-bold">
                  <button
                    onClick={() => setPriorityMode("manual")}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      priorityMode === "manual"
                        ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Simples
                  </button>
                  <button
                    onClick={() => setPriorityMode("auto")}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      priorityMode === "auto"
                        ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Avançada
                  </button>
                </div>
              )}
            </div>

            {/* SELEÇÃO MANUAL */}
            {(type !== TaskType.GOAL || priorityMode === "manual") && (
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-950/50 p-1.5 rounded-2xl animate-fade-in">
                {[TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                      priority === p
                        ? p === TaskPriority.HIGH
                          ? "bg-rose-500 text-white shadow-rose-500/30 transform scale-[1.02]"
                          : p === TaskPriority.MEDIUM
                            ? "bg-amber-500 text-white shadow-amber-500/30 transform scale-[1.02]"
                            : "bg-slate-500 text-white shadow-slate-500/30 transform scale-[1.02]"
                        : "bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {p === TaskPriority.LOW ? "Baixa" : p === TaskPriority.MEDIUM ? "Média" : "Alta"}
                  </button>
                ))}
              </div>
            )}

            {/* CALIBRAGEM AUTOMÁTICA (Sliders) */}
            {type === TaskType.GOAL && priorityMode === "auto" && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in mt-2">
                {[
                  { label: "Necessidade", icon: "fas fa-bolt", color: "indigo", val: necessity, set: setNecessity, labelFn: getNecessityLabel },
                  { label: "Satisfação", icon: "fas fa-heart", color: "purple", val: satisfaction, set: setSatisfaction, labelFn: getSatisfactionLabel },
                  { label: "Frequência", icon: "fas fa-calendar-alt", color: "cyan", val: frequency, set: setFrequency, labelFn: getFrequencyLabel },
                ].map((item) => (
                    <div key={item.label} className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                    <i className={`${item.icon} text-${item.color}-400`}></i>
                                    {item.label}
                                </label>
                            </div>
                            <span className={`text-xs font-bold text-${item.color}-600 bg-${item.color}-50 dark:bg-${item.color}-900/30 px-3 py-1.5 rounded-xl border border-${item.color}-100 dark:border-${item.color}-800 min-w-[80px] text-center`}>
                                {item.labelFn(item.val)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={item.val}
                            onChange={(e) => item.set(Number(e.target.value))}
                            className={`w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-${item.color}-600 hover:accent-${item.color}-500 transition-all focus:outline-none`}
                        />
                    </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Shopping Link */}
        {isShopping && (
            <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Link do Produto
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center group-focus-within:bg-emerald-500 group-focus-within:text-white transition-all">
                <i className="fas fa-link text-sm"></i>
                </div>
                <input
                type="url"
                placeholder="https://exemplo.com/produto"
                className="w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-medium p-4 pl-16 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm"
                />
            </div>
            </div>
        )}

        {/* Notes & Tags */}
        <div className={`pt-4 ${isNote ? "" : "border-t border-slate-200 dark:border-slate-700"} space-y-6`}>
            {/* Tags Input */}
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tags</label>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-transparent focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-indigo-500 transition-all flex flex-wrap gap-2 items-center">
                    {tags.map((tag: string) => (
                    <span key={tag} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-indigo-800 dark:hover:text-indigo-200">
                        <i className="fas fa-times"></i>
                        </button>
                    </span>
                    ))}
                    <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder={tags.length > 0 ? "" : "Adicionar tag..."}
                    className="bg-transparent text-sm font-bold text-slate-700 dark:text-white outline-none flex-1 min-w-[80px] p-2"
                    />
                    <button onClick={() => handleAddTag()} className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors">
                    <i className="fas fa-plus text-xs"></i>
                    </button>
                </div>
            </div>

            {/* Notes Textarea */}
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                    {isNote ? "Conteúdo da Nota" : "Notas & Detalhes"}
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={isNote ? "Escreva seus pensamentos..." : "Adicione descrições, links ou anotações..."}
                    rows={isNote ? 8 : 4}
                    className={`w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-medium p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed ${isNote ? "text-lg" : ""}`}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFormFields;