import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TaskType, TaskPriority, RecurrenceInterval } from '../domain/types';

const TaskCreator: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const defaultType = location.state?.defaultType || TaskType.DAILY;

  const [type, setType] = useState<TaskType>(defaultType);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  
  const [dueDate, setDueDate] = useState('');
  const [targetValue, setTargetValue] = useState(''); 
  const [cost, setCost] = useState(''); 
  const [unit, setUnit] = useState('un'); 

  // New States
  const [recurrence, setRecurrence] = useState<RecurrenceInterval>('none');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSave = () => {
    console.log({ 
        title, 
        type, 
        priority: type === TaskType.NOTE ? TaskPriority.LOW : priority, // Default priority for notes
        dueDate, 
        targetValue, 
        cost, 
        unit, 
        recurrence,
        notes,
        tags,
        createdAt: new Date() 
    });
    navigate(-1);
  };

  const handleAddTag = (e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return;
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const getTypeConfig = (t: TaskType) => {
    switch(t) {
      case TaskType.DAILY: 
        return { label: 'Tarefa', icon: 'fas fa-check', color: 'indigo', desc: 'Dia a dia' };
      case TaskType.GOAL: 
        return { label: 'Meta', icon: 'fas fa-bullseye', color: 'amber', desc: 'Objetivo' };
      case TaskType.DREAM: 
        return { label: 'Sonho', icon: 'fas fa-plane', color: 'rose', desc: 'Longo prazo' };
      case TaskType.SHOPPING: 
        return { label: 'Compra', icon: 'fas fa-cart-shopping', color: 'emerald', desc: 'Lista' };
      case TaskType.NOTE: 
        return { label: 'Nota', icon: 'fas fa-sticky-note', color: 'cyan', desc: 'Anotação' };
      default: 
        return { label: 'Item', icon: 'fas fa-star', color: 'slate', desc: 'Geral' };
    }
  };

  const currentConfig = getTypeConfig(type);
  const isNote = type === TaskType.NOTE;
  const isShopping = type === TaskType.SHOPPING;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans relative overflow-hidden transition-colors duration-500">
       
       {/* Ambient Background Lights */}
       <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${currentConfig.color}-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none transition-colors duration-500`}></div>
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

       {/* Header */}
       <div className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-30">
         <button onClick={() => navigate(-1)} className="w-11 h-11 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition-all shadow-sm hover:bg-white dark:hover:bg-slate-800">
           <i className="fas fa-arrow-left text-sm"></i>
         </button>
         
         <div className="px-4 py-1.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Criando {currentConfig.label}
            </span>
         </div>
         
         <div className="w-11"></div> {/* Spacer */}
       </div>

       <div className="flex-1 px-6 pb-40 overflow-y-auto no-scrollbar relative z-20">
         
         {/* 1. Type Selector (Horizontal Carousel) */}
         <div className="mb-10">
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6 snap-x">
             {[TaskType.DAILY, TaskType.NOTE, TaskType.GOAL, TaskType.DREAM, TaskType.SHOPPING].map((t) => {
               const config = getTypeConfig(t);
               const isActive = type === t;
               return (
                 <button
                   key={t}
                   onClick={() => setType(t)}
                   className={`snap-center flex-shrink-0 relative w-28 h-36 rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center gap-3 overflow-hidden group border ${
                     isActive 
                     ? `bg-white border-white shadow-2xl shadow-${config.color}-500/30 scale-100 ring-4 ring-white/10 dark:ring-black/10 z-10` 
                     : 'bg-white/5 dark:bg-slate-800/30 border-transparent scale-95 opacity-60 hover:opacity-100 hover:bg-white/10'
                   }`}
                 >
                   {isActive && (
                      <div className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-${config.color}-50 to-transparent opacity-50`}></div>
                   )}
                   
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all shadow-sm relative z-10 ${
                       isActive ? `bg-${config.color}-500 text-white shadow-lg` : 'bg-slate-200/20 dark:bg-slate-700/50 text-slate-400'
                   }`}>
                     <i className={config.icon}></i>
                   </div>
                   
                   <div className="text-center relative z-10">
                       <p className={`text-xs font-black uppercase tracking-tight ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                           {config.label}
                       </p>
                       <p className={`text-[9px] font-bold mt-1 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>{config.desc}</p>
                   </div>
                 </button>
               );
             })}
           </div>
         </div>

         {/* 2. Main Input (Title) */}
         <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="space-y-2 mb-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Título <span className="text-rose-500">*</span>
            </label>
          </div>
            <div className="relative">
               <textarea 
                 placeholder={
                    isNote ? "Sobre o que é essa nota?" :
                    isShopping ? "O que você quer comprar?" :
                    type === TaskType.GOAL ? "O que você quer alcançar?" :
                    "O que você precisa fazer?"
                 }
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 rows={2}
                 className="w-full bg-transparent text-3xl sm:text-4xl font-black text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none resize-none leading-tight tracking-tight"
                 autoFocus
               />
               {/* Decorative line */}
               <div className={`h-1 w-20 bg-${currentConfig.color}-500 rounded-full mt-4 opacity-50`}></div>
            </div>
         </div>

         {/* 3. Configuration Card (Grouped Fields) */}
         <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-[2.5rem] p-1 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="p-6 space-y-8">
                
                {/* Dynamic Fields Section */}
                {isShopping && (
                   <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Valor Estimado</label>
                     <div className="relative group">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-2xl group-focus-within:scale-110 transition-transform">R$</span>
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

                {(type === TaskType.GOAL || type === TaskType.DREAM) && (
                    <div className="grid grid-cols-5 gap-6">
                         <div className="col-span-3 space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Meta</label>
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
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Unidade</label>
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
                                <option value="GBP">🇬🇧 Libra (£)</option>
                                <option value="JPY">🇯🇵 Iene (¥)</option>
                                <option value="BTC">₿ Bitcoin</option>
                                <option value="ETH">Ξ Ethereum</option>
                                <option value="USDT">₮ Tether</option>
                                <option value="OTHER">Outra</option>
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

                {/* Recurrence Selector (Only for Daily) */}
                {type === TaskType.DAILY && (
                   <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Repetição</label>
                     <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {[
                          { val: 'none', label: 'Não repetir', icon: 'fas fa-ban' },
                          { val: 'daily', label: 'Diariamente', icon: 'fas fa-calendar-day' },
                          { val: 'weekly', label: 'Semanalmente', icon: 'fas fa-calendar-week' },
                          { val: 'monthly', label: 'Mensalmente', icon: 'fas fa-calendar' },
                          { val: 'yearly', label: 'Anualmente', icon: 'fas fa-cake-candles' },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => setRecurrence(opt.val as RecurrenceInterval)}
                            className={`flex-shrink-0 px-4 py-3 rounded-2xl border flex items-center gap-2 transition-all ${
                              recurrence === opt.val 
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                              : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                             <i className={`${opt.icon} text-xs`}></i>
                             <span className="text-xs font-bold whitespace-nowrap">{opt.label}</span>
                          </button>
                        ))}
                     </div>
                   </div>
                )}

                {/* Priority Selector (Hidden for Notes and Shopping) */}
                {!isShopping && !isNote && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Prioridade</label>
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-950/50 p-1.5 rounded-2xl">
                      {[TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH].map(p => (
                        <button
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                            priority === p 
                            ? (p === TaskPriority.HIGH ? 'bg-rose-500 text-white shadow-rose-500/30' : p === TaskPriority.MEDIUM ? 'bg-amber-500 text-white shadow-amber-500/30' : 'bg-slate-500 text-white shadow-slate-500/30')
                            : 'bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-transparent'
                          }`}
                        >
                          {p === TaskPriority.LOW ? 'Baixa' : p === TaskPriority.MEDIUM ? 'Média' : 'Alta'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date Picker (Hidden for Shopping and Notes) */}
                {!isShopping && !isNote && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Prazo Final</label>
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

                {/* Product Link (Only for Shopping) */}
                {isShopping && (
                  <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Link do Produto</label>
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

                {/* Notes & Tags (Available for all) */}
                <div className={`pt-4 ${isNote ? '' : 'border-t border-slate-200 dark:border-slate-700'} space-y-6`}>
                    
                    {/* Tags Input */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tags</label>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-transparent focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-indigo-500 transition-all flex flex-wrap gap-2 items-center">
                          {tags.map(tag => (
                            <span key={tag} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                                #{tag}
                                <button onClick={() => removeTag(tag)} className="hover:text-indigo-800 dark:hover:text-indigo-200"><i className="fas fa-times"></i></button>
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

                    {/* Notes Textarea (Primary content for Note type) */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                        {isNote ? 'Conteúdo da Nota' : 'Notas & Detalhes'}
                      </label>
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={isNote ? "Escreva seus pensamentos..." : "Adicione descrições, links ou anotações importantes..."}
                        rows={isNote ? 8 : 4}
                        className={`w-full bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-medium p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed ${isNote ? 'text-lg' : ''}`}
                      />
                    </div>
                </div>

            </div>
         </div>

       </div>

       {/* Floating Footer */}
       <div className="fixed bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90">
          <button 
            onClick={handleSave}
            disabled={!title}
            className={`w-full text-white font-black py-5 rounded-[2rem] shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 relative overflow-hidden group ${
                !title ? 'bg-slate-400' : `bg-${currentConfig.color}-600 shadow-${currentConfig.color}-500/40 hover:bg-${currentConfig.color}-500`
            }`}
          >
            {/* Glossy effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <span className="relative z-10 text-sm tracking-wide">CONFIRMAR {currentConfig.label.toUpperCase()}</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center relative z-10">
                <i className="fas fa-arrow-right text-[10px]"></i>
            </div>
          </button>
       </div>

    </div>
  );
};

export default TaskCreator;