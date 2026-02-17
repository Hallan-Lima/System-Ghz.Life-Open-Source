import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AppModule } from '../modules.types';
import { defaultModules } from '../modules.data';
import { modulesService } from '../services/modules.service';
import config from '../../../src/config';

interface ModulesContextData {
  modules: AppModule[];
  moduleOrder: string[]; // Lista de IDs na ordem definida pelo usuário
  loading: boolean;
  toggleModule: (moduleId: string) => void;
  toggleFeature: (moduleId: string, featureId: string) => void;
  updateModuleOrder: (newOrder: string[]) => void;
  swapModuleFeatures: (moduleId: string, indexA: number, indexB: number) => void; // Nova função
}

export const ModulesContext = createContext<ModulesContextData>({} as ModulesContextData);

const STORAGE_KEY = config.modulesStorageKey;
const ORDER_KEY = config.modulesOrderKey;

export const ModulesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialização dos Módulos
  const [modules, setModules] = useState<AppModule[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("ModulesContext: Erro ao ler localStorage na inicialização.", e);
    }
    return defaultModules;
  });

  // Inicialização da Ordem
  const [moduleOrder, setModuleOrder] = useState<string[]>(() => {
    try {
        const storedOrder = localStorage.getItem(ORDER_KEY);
        if (storedOrder) {
            return JSON.parse(storedOrder);
        }
    } catch (e) {}
    // Default: Ordem original do array defaultModules
    return defaultModules.map(m => m.id);
  });

  const [loading, setLoading] = useState(false);

  // Persistência: Sempre que 'modules' mudar, salva no storage
  useEffect(() => {
    modulesService.saveModules(modules);
  }, [modules]);

  // Persistência: Sempre que 'moduleOrder' mudar
  useEffect(() => {
      localStorage.setItem(ORDER_KEY, JSON.stringify(moduleOrder));
  }, [moduleOrder]);

  const toggleModule = useCallback((moduleId: string) => {
    setModules(prev => prev.map(mod => 
      mod.id === moduleId ? { ...mod, isEnabled: !mod.isEnabled } : mod
    ));
  }, []);

  const toggleFeature = useCallback((moduleId: string, featureId: string) => {
    setModules(prev => prev.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          features: mod.features.map(feat => 
            feat.id === featureId ? { ...feat, isEnabled: !feat.isEnabled } : feat
          )
        };
      }
      return mod;
    }));
  }, []);

  const updateModuleOrder = useCallback((newOrder: string[]) => {
      setModuleOrder(newOrder);
  }, []);

  // Nova função para reordenar features dentro de um módulo
  const swapModuleFeatures = useCallback((moduleId: string, indexA: number, indexB: number) => {
    setModules(prev => prev.map(mod => {
      if (mod.id !== moduleId) return mod;

      const newFeatures = [...mod.features];
      // Validação básica de índices
      if (indexA < 0 || indexB < 0 || indexA >= newFeatures.length || indexB >= newFeatures.length) {
          return mod;
      }

      // Swap
      [newFeatures[indexA], newFeatures[indexB]] = [newFeatures[indexB], newFeatures[indexA]];

      return { ...mod, features: newFeatures };
    }));
  }, []);

  return (
    <ModulesContext.Provider value={{ modules, moduleOrder, loading, toggleModule, toggleFeature, updateModuleOrder, swapModuleFeatures }}>
      {children}
    </ModulesContext.Provider>
  );
};
