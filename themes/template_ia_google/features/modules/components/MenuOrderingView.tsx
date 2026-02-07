import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useModules } from "../hooks/useModules";
import { AppModule } from "../modules.types";

/**
 * @author HallTech AI
 * View para reordenar a prioridade/exibição dos módulos e suas funcionalidades.
 */
const MenuOrderingView: React.FC = () => {
  const navigate = useNavigate();
  const { modules, moduleOrder, updateModuleOrder, swapModuleFeatures, toggleFeature } = useModules();
  const [activeModules, setActiveModules] = useState<AppModule[]>([]);
  
  // Estado para controlar qual módulo está expandido para edição de features
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // Sincroniza e ordena os módulos locais baseados no Context
  useEffect(() => {
    // 1. Filtra apenas os habilitados
    const enabled = modules.filter(m => m.isEnabled);
    
    // 2. Ordena baseado no moduleOrder salvo
    const sorted = enabled.sort((a, b) => {
        const indexA = moduleOrder.indexOf(a.id);
        const indexB = moduleOrder.indexOf(b.id);
        
        // Se não existir na lista de ordem (novo módulo), joga pro final
        const safeIndexA = indexA === -1 ? 999 : indexA;
        const safeIndexB = indexB === -1 ? 999 : indexB;

        return safeIndexA - safeIndexB;
    });

    setActiveModules(sorted);
  }, [modules, moduleOrder]);

  // Reordena MÓDULOS (Macro)
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...activeModules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    
    setActiveModules(newItems);
    
    const newOrderIds = newItems.map(m => m.id);
    const allIds = Array.from(new Set([...newOrderIds, ...moduleOrder]));
    updateModuleOrder(allIds);
  };

  // Reordena FUNCIONALIDADES (Micro) dentro de um módulo
  const moveFeature = (moduleId: string, featureId: string, direction: 'up' | 'down') => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    // Encontrar o índice REAL da feature no array completo do módulo
    const realIndex = module.features.findIndex(f => f.id === featureId);
    if (realIndex === -1) return;

    // Precisamos encontrar o índice REAL do "vizinho visual" (próxima feature habilitada)
    // para trocar com ele. Simplesmente trocar index +/- 1 pode trocar com uma feature oculta/desabilitada.
    
    // 1. Lista de features visíveis (para achar o vizinho lógico)
    // Mostramos todas que tem ícone, independente de estarem ativas (para poder ativar)
    const visibleFeatures = module.features.filter(f => f.quickAccessIcon);
    const visualIndex = visibleFeatures.findIndex(f => f.id === featureId);
    
    if (visualIndex === -1) return;
    
    const targetVisualIndex = direction === 'up' ? visualIndex - 1 : visualIndex + 1;
    if (targetVisualIndex < 0 || targetVisualIndex >= visibleFeatures.length) return;
    
    const targetFeature = visibleFeatures[targetVisualIndex];
    const targetRealIndex = module.features.findIndex(f => f.id === targetFeature.id);

    // Swap no Contexto usando índices reais
    swapModuleFeatures(moduleId, realIndex, targetRealIndex);
  };

  const toggleExpand = (moduleId: string) => {
    if (expandedModuleId === moduleId) {
        setExpandedModuleId(null);
    } else {
        setExpandedModuleId(moduleId);
    }
  };

  return (
    <Layout title="Organizar Menu">
      <div className="pb-24 max-w-lg mx-auto">
        
        <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <i className="fas fa-sort"></i>
            </div>
            <h2 className="text-xl font-black text-slate-800 dark:text-white">Prioridade de Exibição</h2>
            <p className="text-sm text-slate-400 mt-2">
                Defina a ordem e visibilidade dos módulos e funcionalidades nos menus de acesso rápido.
            </p>
        </div>

        <div className="space-y-4">
            {activeModules.map((module, index) => {
                // Filtra funcionalidades que tem suporte a menu (Ícone), ativas ou não
                const menuFeatures = module.features.filter(f => f.quickAccessIcon);
                // Contador apenas de ativas
                const enabledCount = menuFeatures.filter(f => f.isEnabled).length;
                const hasFeatures = menuFeatures.length > 0;
                const isExpanded = expandedModuleId === module.id;

                return (
                    <div 
                        key={module.id}
                        className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 transition-all"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* Module Header Row */}
                        <div className="p-4 flex items-center gap-4">
                            <span className="text-slate-300 font-bold text-lg w-6 text-center">
                                {index + 1}
                            </span>
                            
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${module.color}-100 dark:bg-${module.color}-900/20 text-${module.color}-600 dark:text-${module.color}-400`}>
                                <i className={module.icon}></i>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 dark:text-white">{module.title}</h3>
                                {hasFeatures && !isExpanded && (
                                    <p className="text-[10px] text-slate-400">
                                        {enabledCount} funcionalidades ativas
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Botão de Expandir Features */}
                                {hasFeatures && (
                                    <button
                                        onClick={() => toggleExpand(module.id)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isExpanded ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}
                                        title="Organizar funcionalidades"
                                    >
                                        <i className={`fas fa-layer-group text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                                    </button>
                                )}

                                {/* Controles de Ordem do Módulo */}
                                <div className="flex flex-col gap-1 border-l border-slate-100 dark:border-slate-800 pl-2 ml-1">
                                    <button 
                                        onClick={() => moveItem(index, 'up')}
                                        disabled={index === 0}
                                        className="w-6 h-6 rounded bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-400 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        <i className="fas fa-chevron-up text-[10px]"></i>
                                    </button>
                                    <button 
                                        onClick={() => moveItem(index, 'down')}
                                        disabled={index === activeModules.length - 1}
                                        className="w-6 h-6 rounded bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-400 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        <i className="fas fa-chevron-down text-[10px]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Features Sub-list (Expandable) */}
                        {isExpanded && hasFeatures && (
                            <div className="bg-slate-50/50 dark:bg-black/20 border-t border-slate-100 dark:border-slate-800 p-3 pl-16 space-y-2 animate-in slide-in-from-top-2">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                    Ordem no Menu Rápido
                                </p>
                                {menuFeatures.map((feat, fIndex) => (
                                    <div 
                                        key={feat.id} 
                                        className={`flex items-center justify-between bg-white dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-all duration-300 ${!feat.isEnabled ? 'opacity-60 grayscale' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`${feat.quickAccessIcon} text-slate-400 text-xs w-4 text-center`}></i>
                                            <span className={`text-xs font-bold ${feat.isEnabled ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 line-through decoration-slate-300'}`}>
                                                {feat.label}
                                            </span>
                                        </div>
                                        
                                        <div className="flex gap-1 items-center">
                                            {/* Toggle Visibility */}
                                            <button 
                                                onClick={() => toggleFeature(module.id, feat.id)}
                                                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                                                    feat.isEnabled 
                                                    ? 'text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20' 
                                                    : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                                }`}
                                                title={feat.isEnabled ? "Ocultar do menu" : "Mostrar no menu"}
                                            >
                                                <i className={`fas ${feat.isEnabled ? 'fa-eye' : 'fa-eye-slash'} text-[10px]`}></i>
                                            </button>

                                            <div className="w-px h-3 bg-slate-200 dark:bg-slate-700 mx-1"></div>

                                            <button 
                                                onClick={() => moveFeature(module.id, feat.id, 'up')}
                                                disabled={fIndex === 0}
                                                className="w-6 h-6 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-20 flex items-center justify-center"
                                            >
                                                <i className="fas fa-arrow-up text-[9px]"></i>
                                            </button>
                                            <button 
                                                onClick={() => moveFeature(module.id, feat.id, 'down')}
                                                disabled={fIndex === menuFeatures.length - 1}
                                                className="w-6 h-6 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-20 flex items-center justify-center"
                                            >
                                                <i className="fas fa-arrow-down text-[9px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        <button 
            onClick={() => navigate('/modules')}
            className="w-full mt-8 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all"
        >
            CONCLUIR
        </button>

      </div>
    </Layout>
  );
};

export default MenuOrderingView;
