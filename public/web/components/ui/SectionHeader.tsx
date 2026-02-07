import React from 'react';

interface SectionHeaderProps {
  title: string;
  onSeeMore?: () => void;
}

/**
 * @author HallTech AI
 * Cabeçalho padrão de seção com título e botão opcional "Ver Mais".
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeMore }) => (
  <div className="flex justify-between items-center mb-4 px-1">
    <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">
      {title}
    </h2>
    {onSeeMore && (
      <button
        onClick={onSeeMore}
        className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
      >
        Ver Mais
      </button>
    )}
  </div>
);

export default SectionHeader;