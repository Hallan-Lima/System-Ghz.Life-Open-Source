import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../../features/modules/hooks/useModules';

interface QuickActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  enableAi?: boolean;
}

/**
 * @author HallTech AI
 * QuickActionMenu Component
 * Overlay que exibe funcionalidades ativas dos módulos configurados pelo usuário.
 * Respeita a ordem definida em `moduleOrder`.
 */
const QuickActionMenu: React.FC<QuickActionMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { modules, moduleOrder } = useModules();

  const quickActions = useMemo(() => {
    // 1. Filtra módulos ativos
    const activeModules = modules.filter(m => m.isEnabled);
    
    // 2. Ordena módulos baseados na preferência do usuário
    const sortedModules = activeModules.sort((a, b) => {
        let indexA = moduleOrder.indexOf(a.id);
        let indexB = moduleOrder.indexOf(b.id);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    // 3. Extrai features que tem ícone de acesso rápido e estão ativas
    const actions: Array<{
        id: string;
        label: string;
        icon: string;
        route: string;
        color: string;
    }> = [];

    sortedModules.forEach(mod => {
        mod.features.forEach(feat => {
            if (feat.isEnabled && feat.quickAccessIcon && feat.route) {
                actions.push({
                    id: feat.id,
                    label: feat.label,
                    icon: feat.quickAccessIcon,
                    route: feat.route,
                    color: mod.color
                });
            }
        });
    });

    return actions;
  }, [modules, moduleOrder]);

  const handleNavigate = (route: string) => {
      onClose();
      navigate(route);
  };

  return (
    <>
      {/* Quick Menu Overlay (Backdrop) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        ></div>
      )}

      {/* Quick Menu Content */}
      <div className={`fixed bottom-24 left-4 right-4 z-40 lg:hidden transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative">
          
          {/* Triangle Pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 rotate-45 border-b border-r border-slate-100 dark:border-slate-800"></div>

          {quickActions.length > 0 ? (
              <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto no-scrollbar">
                {quickActions.map((action) => (
                    <button 
                        key={action.id} 
                        onClick={() => handleNavigate(action.route)} 
                        className="flex flex-col items-center gap-2 group p-1"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-${action.color}-50 dark:bg-${action.color}-900/20 text-${action.color}-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform`}>
                            <i className={action.icon}></i>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight line-clamp-2 w-full">
                            {action.label}
                        </span>
                    </button>
                ))}
              </div>
          ) : (
              <div className="text-center py-4 text-slate-400">
                  <p className="text-xs">Nenhuma funcionalidade ativa.</p>
                  <button onClick={() => handleNavigate('/modules')} className="text-indigo-500 font-bold text-xs mt-2 uppercase">Configurar Módulos</button>
              </div>
          )}

        </div>
      </div>
    </>
  );
};

export default QuickActionMenu;
