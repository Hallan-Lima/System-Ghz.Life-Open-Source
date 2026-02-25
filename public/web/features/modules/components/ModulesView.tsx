import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useModules } from "../hooks/useModules";
import ModuleConfigCard from "./ModuleConfigCard";

/**
 * @author HallTech AI
 * Página de gerenciamento de módulos e features.
 */
const ModulesView: React.FC = () => {
  const { modules, loading, toggleModule, toggleFeature } = useModules();
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'DISABLED'>('ALL');
  const [showBanner, setShowBanner] = useState(true);

  // Lógica de Filtro Inteligente (Ajustada)
  const filteredModules = modules.map(module => {
    if (filter === 'ACTIVE') {
      if (!module.isEnabled) return null; // Oculta módulos 100% desativados
      return {
        ...module,
        features: module.features.filter(f => f.isEnabled) // Mostra SÓ as features ativas
      };
    }
    
    if (filter === 'DISABLED') {
      if (!module.isEnabled) {
        return module; // Se o módulo tá todo desligado, mostra ele todo
      }
      
      // Se o módulo tá ativo, precisamos ver se ele tem "filhos" desligados
      const disabledFeatures = module.features.filter(f => !f.isEnabled);
      
      if (disabledFeatures.length > 0) {
        return {
          ...module,
          features: disabledFeatures // Mostra o módulo, mas SÓ com os filhos desligados
        };
      }
      
      return null; // Módulo ativo e 100% das features ativas = some da aba Desativados
    }
    
    // 'ALL' - Retorna tudo exatamente como veio do banco
    return module;
  }).filter(Boolean) as typeof modules; // Remove os nulos

  return (
    <Layout title="Módulos">
      <div className="pb-24 space-y-6">
        
        {/* Dica Interativa com botão de Fechar */}
        {showBanner && (
          <div className="bg-indigo-500/10 dark:bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-5 relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-4 right-4 text-indigo-400/60 hover:text-indigo-500 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 flex-shrink-0">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-1">
                  Organize do seu jeito!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3 leading-relaxed pr-2">
                  Sabia que você pode mudar a ordem em que os menus aparecem na sua tela inicial?
                </p>
                <button
                  onClick={() => navigate("/modules/order")}
                  className="bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-600 active:scale-95 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-sort"></i> Personalizar Layout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Abas Estilo "Tarefas" */}
        <div className="flex bg-slate-200/50 dark:bg-slate-900 p-1.5 rounded-2xl">
          <button 
            onClick={() => setFilter('ALL')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'ALL' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('ACTIVE')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'ACTIVE' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'}`}
          >
            Ativos
          </button>
          <button 
            onClick={() => setFilter('DISABLED')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'DISABLED' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'}`}
          >
            Desativados
          </button>
        </div>

        {/* Lista de Módulos */}
        {loading ? (
           <div className="flex justify-center py-20">
             <i className="fas fa-spinner animate-spin text-indigo-600 text-3xl"></i>
           </div>
        ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {filteredModules.length > 0 ? (
                filteredModules.map((module) => (
                  <ModuleConfigCard
                    key={module.id}
                    module={module}
                    onToggleModule={toggleModule}
                    onToggleFeature={toggleFeature}
                  />
                ))
              ) : (
                <div className="text-center py-10 opacity-70">
                  <i className="fas fa-folder-open text-4xl text-slate-300 dark:text-slate-700 mb-3 block"></i>
                  <p className="text-slate-500 font-medium text-sm">Nenhuma funcionalidade nesta categoria.</p>
                </div>
              )}
            </div>
        )}
        
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
            Alterações são salvas automaticamente
        </p>
      </div>
    </Layout>
  );
};

export default ModulesView;