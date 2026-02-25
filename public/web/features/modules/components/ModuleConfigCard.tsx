import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppModule } from "../modules.types";
import FeatureToggle from "./FeatureToggle";
import { useModules } from "../hooks/useModules";

interface ModuleConfigCardProps {
  module: AppModule;
  onToggleModule: (id: string) => void;
  onToggleFeature: (modId: string, featId: string) => void;
}

const ModuleConfigCard: React.FC<ModuleConfigCardProps> = ({
  module,
  onToggleModule,
  onToggleFeature,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { changeFeatureMode } = useModules();
  const isComingSoon = module.status?.toLowerCase() === "em breve";

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!module.isEnabled || isComingSoon) return;

    const routes: Record<string, string> = {
      "1": "/tasks",
      "2": "/finance",
      "3": "/health",
      "4": "/ia",
      "5": "/social",
    };

    const route = routes[module.id] || module.route;
    if (route) navigate(route);
  };

  return (
    <div className={`bg-white dark:bg-slate-900/50 rounded-3xl border-2 transition-all overflow-hidden ${module.isEnabled ? 'border-slate-200 dark:border-slate-700 shadow-sm' : 'border-slate-100 dark:border-slate-800/60'}`}>
      <div
        className={`p-5 flex items-center justify-between cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 ${isComingSoon ? "opacity-60" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
          <div
            onClick={handleIconClick}
            className={`flex-shrink-0 relative w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
              module.isEnabled && !isComingSoon
                ? `bg-${module.color}-500 text-white shadow-lg shadow-${module.color}-500/30 cursor-pointer hover:scale-105 active:scale-95`
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default"
            }`}
          >
            <i className={module.icon}></i>
            
            {/* Indicador visual sutil de navegação quando ativo */}
            {module.isEnabled && !isComingSoon && (
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm border-2 border-slate-50 dark:border-slate-900 transition-transform">
                <i className={`fas fa-arrow-right text-[8px] text-${module.color}-500 dark:text-slate-400`}></i>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800 dark:text-white text-lg tracking-tight truncate">
                {module.title}
              </h3>
              {isComingSoon && (
                <span className="flex-shrink-0 text-[9px] bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  Em breve
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium truncate">
              {module.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isComingSoon) onToggleModule(module.id);
            }}
            className={`w-12 h-7 rounded-full relative transition-all duration-300 ${isComingSoon
                ? "bg-slate-200 dark:bg-slate-800 cursor-not-allowed"
                : module.isEnabled
                  ? `bg-${module.color}-500 shadow-inner`
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${module.isEnabled ? "left-6" : "left-1"}`}>
            </div>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${expanded ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200' : ''}`}
          >
            <i className={`fas fa-chevron-down transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}></i>
          </button>
        </div>
      </div>

      <div className={`bg-slate-50/50 dark:bg-black/10 border-t border-slate-100 dark:border-slate-800 transition-all duration-500 ease-in-out ${expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-2 flex items-center gap-2">
            <i className="fas fa-layer-group"></i> Funcionalidades
          </p>
          <div className="space-y-1">
            {module.features.map((feature) => (
              <FeatureToggle
                key={feature.id}
                feature={feature}
                color={module.color}
                onToggle={() => onToggleFeature(module.id, feature.id)}
                onModeChange={(mode) => changeFeatureMode(module.id, feature.id, mode)}
                disabledParent={!module.isEnabled}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleConfigCard;