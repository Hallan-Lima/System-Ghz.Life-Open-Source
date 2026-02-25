import React from "react";
import {
  TaskType,
  TaskPriority,
  RecurrenceInterval,
} from "../../../../domain/tasks.types";
import {
  getNecessityLabel,
  getSatisfactionLabel,
  getFrequencyLabel,
} from "../../tasks.utils";
import { useModules } from "../../../modules/hooks/useModules";

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
    type,
    cost,
    setCost,
    targetValue,
    setTargetValue,
    unit,
    setUnit,
    currentValue,
    setCurrentValue,
    recurrence,
    setRecurrence,
    dueDate,
    setDueDate,
    priorityMode,
    setPriorityMode,
    priority,
    setPriority,
    necessity,
    setNecessity,
    satisfaction,
    setSatisfaction,
    frequency,
    setFrequency,
    tags,
    tagInput,
    setTagInput,
    notes,
    setNotes,
  } = form;

  const { handleAddTag, removeTag } = actions;

  const isShopping = type === TaskType.SHOPPING;
  const isNote = type === TaskType.NOTE;
  const isGoalOrDream = type === TaskType.GOAL || type === TaskType.DREAM;

  const isFinancial = ["BRL", "USD", "EUR"].includes(unit);

  const toggleUnitMode = () => {
    if (isFinancial) {
      setUnit("un");
    } else {
      setUnit("BRL");
    }
  };

  // --- 1. LÓGICA DE DETECÇÃO DO MODO (SIMPLES x AVANÇADO) ---
  const { modules } = useModules();
  const prodModule = modules.find((m) => String(m.id) === "1");
  const featureMap: Record<string, string> = {
    [TaskType.DAILY]: "1",
    [TaskType.GOAL]: "2",
    [TaskType.DREAM]: "3",
    [TaskType.SHOPPING]: "4",
    [TaskType.NOTE]: "5",
  };
  const currentFeature = prodModule?.features.find(
    (f) => String(f.id) === featureMap[type],
  );

  // A mágica acontece aqui: A variável diz se a tela deve ser simples ou não
  const isSimpleMode =
    currentFeature?.experienceMode === "SIMPLE" ||
    !currentFeature?.experienceMode;

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-[2.5rem] p-1 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
      <div className="p-6 space-y-8">
        {/* SHOPPING: Valor Estimado (Apenas Avançado) */}
        {isShopping && !isSimpleMode && (
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

        {/* GOALS/DREAMS: Meta, Valor Atual e Unidade (Apenas Avançado) */}
        {isGoalOrDream && !isSimpleMode && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Já tenho (Saldo Atual)
              </label>
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-transparent focus-within:ring-2 focus-within:ring-indigo-500 transition-all overflow-hidden">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {isFinancial ? "R$" : "#"}
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  className="w-full bg-transparent text-slate-800 dark:text-white text-lg font-bold p-4 pl-10 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                  Meta Alvo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none z-10">
                    {isFinancial ? "R$" : "#"}
                  </span>
                  <input
                    type="number"
                    placeholder="100"
                    min="1"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xl font-bold p-4 pl-10 rounded-2xl border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Unidade
                  </label>
                  <button
                    type="button"
                    onClick={toggleUnitMode}
                    className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md"
                  >
                    {isFinancial ? (
                      <i className="fas fa-font"></i>
                    ) : (
                      <i className="fas fa-dollar-sign"></i>
                    )}
                  </button>
                </div>

                {isFinancial ? (
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xl font-bold p-4 rounded-2xl border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="BRL">R$ (BRL)</option>
                    <option value="USD">$ (USD)</option>
                    <option value="EUR">€ (EUR)</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Kg, un..."
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xl font-bold p-4 rounded-2xl border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-center"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* DAILY: Recorrência (Apenas Avançado) */}
        {type === TaskType.DAILY && !isSimpleMode && (
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Repetição
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {[
                { val: "none", label: "Não repetir", icon: "fas fa-ban" },
                {
                  val: "daily",
                  label: "Diariamente",
                  icon: "fas fa-calendar-day",
                },
                {
                  val: "weekly",
                  label: "Semanalmente",
                  icon: "fas fa-calendar-week",
                },
                {
                  val: "monthly",
                  label: "Mensalmente",
                  icon: "fas fa-calendar",
                },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
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

        {/* Data (Apenas Avançado) */}
        {!isShopping && !isNote && !isSimpleMode && (
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
                value={dueDate ? String(dueDate).substring(0, 10) : ""}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-bold p-4 pl-16 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none"
              />
            </div>
          </div>
        )}

        {/* PRIORIDADE */}
        {!isNote && (
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Definição de Prioridade
              </label>

              {/* Botões de Trocar Modo: Esconde se a tela toda estiver no modo simples */}
              {!isSimpleMode && (
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex text-[10px] font-bold">
                  <button
                    type="button"
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
                    type="button"
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

            {/* SELEÇÃO MANUAL - Mostra se for manual OU se estiver forçado no Modo Simples */}
            {(isSimpleMode || priorityMode === "manual") && (
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-950/50 p-1.5 rounded-2xl animate-fade-in">
                {[TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH].map(
                  (p) => (
                    <button
                      type="button"
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
                      {p === TaskPriority.LOW
                        ? "Baixa"
                        : p === TaskPriority.MEDIUM
                          ? "Média"
                          : "Alta"}
                    </button>
                  ),
                )}
              </div>
            )}

            {/* CALIBRAGEM AUTOMÁTICA (Sliders) - Só aparece no Avançado */}
            {!isSimpleMode && priorityMode === "auto" && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in mt-2">
                {[
                  {
                    label: "Necessidade",
                    icon: "fas fa-bolt",
                    color: "indigo",
                    val: necessity,
                    set: setNecessity,
                    labelFn: getNecessityLabel,
                  },
                  {
                    label: "Satisfação",
                    icon: "fas fa-heart",
                    color: "purple",
                    val: satisfaction,
                    set: setSatisfaction,
                    labelFn: getSatisfactionLabel,
                  },
                  {
                    label: "Frequência",
                    icon: "fas fa-calendar-alt",
                    color: "cyan",
                    val: frequency,
                    set: setFrequency,
                    labelFn: getFrequencyLabel,
                  },
                ].map((item) => (
                  <div key={item.label} className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                          <i
                            className={`${item.icon} text-${item.color}-400`}
                          ></i>
                          {item.label}
                        </label>
                      </div>
                      <span
                        className={`text-xs font-bold text-${item.color}-600 bg-${item.color}-50 dark:bg-${item.color}-900/30 px-3 py-1.5 rounded-xl border border-${item.color}-100 dark:border-${item.color}-800 min-w-[80px] text-center`}
                      >
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

        {/* Shopping Link (Apenas Avançado) */}
        {isShopping && !isSimpleMode && (
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

        {/* Notes & Tags (Apenas Avançado, exceto Notas que sempre mostra o campo de texto) */}
        {(!isSimpleMode || isNote) && (
          <div
            className={`pt-4 ${isNote ? "" : "border-t border-slate-200 dark:border-slate-700"} space-y-6`}
          >
            {/* Tags Input (Apenas Avançado) */}
            {!isSimpleMode && (
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                  Tags
                </label>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-transparent focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-indigo-500 transition-all flex flex-wrap gap-2 items-center">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-indigo-800 dark:hover:text-indigo-200"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder={tags.length > 0 ? "" : "Adicionar tag..."}
                    className="bg-transparent text-sm font-bold text-slate-700 dark:text-white outline-none flex-1 min-w-[80px] p-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag()}
                    className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                  >
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Notes Textarea (Aparece se for uma Nota Simples OU se tiver no Modo Avançado) */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                {isNote ? "Conteúdo da Nota" : "Notas & Detalhes"}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  isNote
                    ? "Escreva seus pensamentos..."
                    : "Adicione descrições, links ou anotações..."
                }
                rows={isNote ? 8 : 4}
                className={`w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-medium p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed ${isNote ? "text-lg" : ""}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFormFields;
