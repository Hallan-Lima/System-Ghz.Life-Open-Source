import React from 'react';

interface QuickActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

/**
 * QuickActionMenu Component
 * Overlay que exibe ações rápidas quando o FAB é ativado em contextos específicos.
 */
const QuickActionMenu: React.FC<QuickActionMenuProps> = ({ isOpen, onClose, onAction }) => {
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

          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => onAction('ai')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="fas fa-heart-pulse"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Sugestões IA</span>
            </button>

            <button onClick={() => onAction('explore')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="far fa-compass"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Explorar</span>
            </button>

            <button onClick={() => onAction('bills')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Contas</span>
            </button>

            <button onClick={() => onAction('calendar')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center text-xl shadow-sm group-active:scale-90 transition-transform">
                <i className="far fa-calendar-alt"></i>
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">Agenda</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickActionMenu;