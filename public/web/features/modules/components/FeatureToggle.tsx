import React from "react";
import { AppFeature } from "../modules.types";

interface FeatureToggleProps {
  feature: AppFeature;
  color: string;
  onToggle: () => void;
  disabledParent?: boolean;
  onModeChange?: (mode: "SIMPLE" | "ADVANCED") => void;
}

/**
 * @author HallTech AI
 * Item de lista para ativar/desativar uma feature específica.
 * TODO: Refatorar para usar a descrição do status que vem do backend.
 */
const FeatureToggle: React.FC<FeatureToggleProps> = ({ feature, color, onToggle, disabledParent, onModeChange }) => {
  const isComingSoon = feature.status?.toLowerCase() === "em breve";
  
  // Define o estado atual baseado nas propriedades do banco
  const currentMode = !feature.isEnabled ? 'OFF' : (feature.experienceMode || 'SIMPLE');

  const handleSelectMode = (selected: 'OFF' | 'SIMPLE' | 'ADVANCED') => {
    if (isComingSoon || disabledParent) return;

    if (selected === 'OFF') {
      if (feature.isEnabled) onToggle(); // Desliga a feature
    } else {
      if (!feature.isEnabled) onToggle(); // Liga a feature se estiver desligada
      if (onModeChange && feature.experienceMode !== selected) {
        onModeChange(selected); // Atualiza o modo
      }
    }
  };

  return (
    <div className={`flex flex-col p-4 mb-2 rounded-2xl border border-slate-100 dark:border-slate-800/60 transition-all ${
      disabledParent ? 'opacity-50 pointer-events-none' : isComingSoon ? 'pointer-events-none bg-slate-50/50 dark:bg-slate-900/30' : 'bg-white dark:bg-slate-900/50 hover:border-slate-200 dark:hover:border-slate-700'
    }`}>
      {/* Cabeçalho da Feature */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1 pr-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-black text-slate-700 dark:text-slate-200 leading-none">
              {feature.label}
            </span>
            {isComingSoon && (
              <span className="text-[9px] bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide flex-shrink-0">
                em breve
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 font-medium leading-tight">
            {feature.description}
          </span>
        </div>
      </div>

      {/* Controle Segmentado (Pill 3-states) */}
      {!isComingSoon && (
        <div className="flex bg-slate-100 dark:bg-slate-950/50 p-1 rounded-xl w-full border border-slate-200/50 dark:border-slate-800/50">
          <button 
            onClick={() => handleSelectMode('OFF')}
            className={`flex-1 text-[10px] font-bold py-2 rounded-lg transition-all ${currentMode === 'OFF' ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
          >
            Desativado
          </button>
          <button 
            onClick={() => handleSelectMode('SIMPLE')}
            className={`flex-1 text-[10px] font-bold py-2 rounded-lg transition-all ${currentMode === 'SIMPLE' ? `bg-${color}-500 text-white shadow-md shadow-${color}-500/20` : 'text-slate-400 hover:text-slate-500'}`}
          >
            Simples
          </button>
          <button 
            onClick={() => handleSelectMode('ADVANCED')}
            className={`flex-1 text-[10px] font-bold py-2 rounded-lg transition-all ${currentMode === 'ADVANCED' ? `bg-${color}-500 text-white shadow-md shadow-${color}-500/20` : 'text-slate-400 hover:text-slate-500'}`}
          >
            Avançado
          </button>
        </div>
      )}
    </div>
  );
};

export default FeatureToggle;