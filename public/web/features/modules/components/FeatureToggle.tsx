import React from "react";
import { AppFeature } from "../modules.types";

interface FeatureToggleProps {
  feature: AppFeature;
  color: string;
  onToggle: () => void;
  disabledParent?: boolean;
}

/**
 * @author HallTech AI
 * Item de lista para ativar/desativar uma feature específica.
 * TODO: Refatorar para usar a descrição do status que vem do backend.
 */
const FeatureToggle: React.FC<FeatureToggleProps> = ({ feature, color, onToggle, disabledParent }) => {
  const isComingSoon = feature.status?.toLowerCase() === "em breve";

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${
      disabledParent ? 'opacity-50 pointer-events-none' : isComingSoon ? 'pointer-events-none opacity-90' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
    }`}>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {feature.label}
          </span>
          {isComingSoon && (
            <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
              em breve
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          {feature.description}
        </span>
      </div>

      {isComingSoon ? (
        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-2 py-1 rounded-full font-bold uppercase tracking-wide">
          em breve
        </span>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className={`w-10 h-6 rounded-full relative transition-all duration-300 ${
            feature.isEnabled 
              ? `bg-${color}-500 shadow-inner` 
              : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <div 
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
              feature.isEnabled ? 'left-5' : 'left-1'
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default FeatureToggle;
