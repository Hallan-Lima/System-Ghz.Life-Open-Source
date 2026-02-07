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
 */
const FeatureToggle: React.FC<FeatureToggleProps> = ({ feature, color, onToggle, disabledParent }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${disabledParent ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {feature.label}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">
          {feature.description}
        </span>
      </div>

      <button
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
        ></div>
      </button>
    </div>
  );
};

export default FeatureToggle;
