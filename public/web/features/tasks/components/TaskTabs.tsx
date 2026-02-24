/**
 * @file TaskTabs.tsx
 * @description Abas de navegação para filtrar os diferentes tipos de tarefas baseadas nas permissões do usuário.
 * @author HallTech AI
 */

import React, { useEffect, useMemo } from 'react';
import { useModules } from '../../modules/hooks/useModules';
import { TaskFilterType } from '../hooks/useTasks';

interface TaskTabsProps {
  activeTab: TaskFilterType;
  onTabChange: (tab: TaskFilterType) => void;
}

const TaskTabs: React.FC<TaskTabsProps> = ({ activeTab, onTabChange }) => {
  const { modules } = useModules();

  const productivityModule = modules.find(m => String(m.id) === '1');
  const features = productivityModule?.features || [];

  const isFeatureEnabled = (id: string) => {
    return features.find(f => String(f.id) === id)?.isEnabled ?? false;
  };

  const availableTabs = useMemo(() => {
    const featureTabs = [
      { id: 'DAILY', label: 'Tarefas', icon: 'fas fa-check-double', show: isFeatureEnabled('1') },
      { id: 'GOAL', label: 'Metas', icon: 'fas fa-bullseye', show: isFeatureEnabled('2') },
      { id: 'DREAM', label: 'Sonhos', icon: 'fas fa-plane', show: isFeatureEnabled('3') },
      { id: 'SHOPPING', label: 'Compras', icon: 'fas fa-cart-shopping', show: isFeatureEnabled('4') },
      { id: 'NOTE', label: 'Notas', icon: 'fas fa-sticky-note', show: isFeatureEnabled('5') }
    ];
    
    const activeTabs = featureTabs.filter(tab => tab.show);

    if (activeTabs.length > 1) {
      activeTabs.unshift({ id: 'ALL', label: 'Tudo', icon: 'fas fa-layer-group', show: true });
    }

    return activeTabs;
  }, [features]);

  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.find(tab => tab.id === activeTab)) {
      onTabChange(availableTabs[0].id as TaskFilterType);
    }
  }, [activeTab, availableTabs, onTabChange]);

  if (availableTabs.length <= 1) return null; // Não mostra menu se tiver apenas a aba Tudo

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
      {availableTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TaskFilterType)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap font-bold text-sm transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none scale-105'
              : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
          }`}
        >
          <i className={tab.icon}></i>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TaskTabs;