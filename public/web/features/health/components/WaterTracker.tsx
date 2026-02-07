import React from "react";

interface WaterTrackerProps {
  currentDisplay: string;
  goalDisplay: string;
  percentage: number;
  onAddWater: (amount: number) => void;
}

/**
 * @author HallTech AI
 * Componente visual para monitoramento de hidratação com gráfico circular SVG.
 */
const WaterTracker: React.FC<WaterTrackerProps> = ({ 
  currentDisplay, 
  goalDisplay, 
  percentage, 
  onAddWater 
}) => {
  // Configuração SVG
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
      <h3 className="font-black text-2xl text-slate-800 dark:text-white mb-8">
        Hidratação Diária
      </h3>

      <div className="relative inline-flex items-center justify-center mb-8">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Círculo de Fundo */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Círculo de Progresso */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-cyan-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">
            {currentDisplay}L
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Meta {goalDisplay}L
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => onAddWater(200)}
          className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-3xl active:scale-95 transition-all hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
        >
          <p className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 mb-1">
            COPO
          </p>
          <p className="text-lg font-black text-cyan-600 dark:text-cyan-400">
            200ml
          </p>
        </button>
        <button 
          onClick={() => onAddWater(500)}
          className="bg-indigo-600 p-4 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 transition-all text-white hover:bg-indigo-500"
        >
          <p className="text-[10px] font-black opacity-70 mb-1">GARRAFA</p>
          <p className="text-lg font-black">500ml</p>
        </button>
        <button 
          className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-3xl active:scale-95 transition-all hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
        >
          <p className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 mb-1">
            PERSONAL
          </p>
          <i className="fas fa-edit text-cyan-600"></i>
        </button>
      </div>
    </section>
  );
};

export default WaterTracker;