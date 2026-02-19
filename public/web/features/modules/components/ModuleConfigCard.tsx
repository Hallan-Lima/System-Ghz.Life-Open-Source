import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppModule } from "../modules.types";
import FeatureToggle from "./FeatureToggle";

interface ModuleConfigCardProps {
  module: AppModule;
  onToggleModule: (id: string) => void;
  onToggleFeature: (modId: string, featId: string) => void;
}

/**
 * @author HallTech AI
 * Card expansível que controla um módulo e suas features.
 */
const ModuleConfigCard: React.FC<ModuleConfigCardProps> = ({ module, onToggleModule, onToggleFeature }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const isComingSoon = module.status?.toLowerCase() === "em breve";

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita expandir o card ao clicar no ícone
    
    if (!module.isEnabled || isComingSoon) return;

    // Mapeamento de rotas baseado no ID do módulo
    const routes: Record<string, string> = {
        productivity: '/tasks',
        finance: '/finance',
        health: '/health',
        ai_assistant: '/ia'
    };

    const route = routes[module.id];
    if (route) {
        navigate(route);
    }
  };

  return (
    <div className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${
        module.isEnabled 
            ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm" 
            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 opacity-80"
    }`}>
      
      {/* Header do Card (Módulo Principal) */}
      <div className="p-5 flex items-center gap-4">
        {/* Ícone Navegável */}
        <div 
            onClick={handleIconClick}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-all relative z-10 ${
            module.isEnabled
                ? `bg-${module.color}-100 dark:bg-${module.color}-900/20 text-${module.color}-600 dark:text-${module.color}-400 cursor-pointer hover:scale-105 active:scale-95`
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-default"
        }`}>
            <i className={module.icon}></i>
            
            {/* Indicador visual sutil de navegação quando ativo */}
            {module.isEnabled && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm border border-slate-50 dark:border-slate-700">
                     <i className="fas fa-arrow-right text-[8px] text-slate-400"></i>
                </div>
            )}
        </div>

        {/* Textos (Expandir ao clicar) */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center gap-2">
                <h3 className={`font-black text-lg truncate ${module.isEnabled ? 'text-slate-800 dark:text-white' : 'text-slate-500'}`}>
                    {module.title}
                </h3>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                    isComingSoon
                        ? "bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400"
                        : module.isEnabled
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}>
                    {isComingSoon ? "em breve" : module.isEnabled ? "Ativo" : "Inativo"}
                </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {module.description}
            </p>
        </div>

        {/* Toggle Principal */}
        <div className="flex flex-col items-center gap-2">
            <button
                type="button"
                disabled={isComingSoon}
                onClick={() => !isComingSoon && onToggleModule(module.id)}
                className={`w-12 h-7 rounded-full relative transition-all duration-300 ${
                isComingSoon
                    ? "bg-slate-300 dark:bg-slate-700 opacity-60 cursor-not-allowed pointer-events-none"
                    : module.isEnabled 
                        ? `bg-${module.color}-600 shadow-lg shadow-${module.color}-500/30 cursor-pointer` 
                        : "bg-slate-300 dark:bg-slate-700 cursor-pointer"
                }`}
            >
                <div 
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
                        module.isEnabled ? 'left-6' : 'left-1'
                    }`}
                >
                     {module.isEnabled && <i className={`fas fa-check text-[10px] text-${module.color}-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></i>}
                </div>
            </button>
            <button 
                onClick={() => setExpanded(!expanded)}
                className="text-slate-300 hover:text-slate-500 transition-colors"
            >
                <i className={`fas fa-chevron-down transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}></i>
            </button>
        </div>
      </div>

      {/* Lista de Funcionalidades (Expansível) */}
      <div className={`bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-slate-800 transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
          <div className="p-4 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-2">
                Funcionalidades do Módulo
            </p>
            {module.features.map(feature => (
                <FeatureToggle 
                    key={feature.id}
                    feature={feature}
                    color={module.color}
                    onToggle={() => onToggleFeature(module.id, feature.id)}
                    disabledParent={isComingSoon ? true : !module.isEnabled}
                />
            ))}
          </div>
      </div>
    </div>
  );
};

export default ModuleConfigCard;