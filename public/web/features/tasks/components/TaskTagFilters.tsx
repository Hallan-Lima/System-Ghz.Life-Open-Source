import React from "react";

interface TaskTagFiltersProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

/**
 * @author HallTech AI
 * Faixa rolável de tags para filtrar tarefas.
 */
const TaskTagFilters: React.FC<TaskTagFiltersProps> = ({ tags, selectedTag, onSelectTag }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar mt-2">
      <button
        onClick={() => onSelectTag(null)}
        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
          selectedTag === null
            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30"
            : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
        }`}
      >
        Todas as tags
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag === selectedTag ? null : tag)} // Clique duplo na mesma tag a desmarca
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            selectedTag === tag
              ? "bg-indigo-600 text-white shadow-sm border border-transparent"
              : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
          }`}
        >
          <i className="fas fa-hashtag text-[10px] opacity-70"></i>
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TaskTagFilters;