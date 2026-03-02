/**
 * @file ModulesContext.tsx
 * @description Gerenciamento de estado global dos Módulos e Funcionalidades (Feature Flags).
 * * @architecture Diretrizes do Guia de Arquitetura (System Ghz.Life):
 * - Feature-Based: Pertence ao domínio 'modules', isolando regras de negócio de UI.
 * - Single Source of Truth: Dependência estrita da API (Banco de Dados).
 * - Security: Não utiliza cache local (localStorage) para inicializar permissões.
 * Se o backend falhar ao retornar os módulos ativos, a sessão é encerrada (Logout).
 * * @author HallTech AI
 */

import React, { createContext, useState, useEffect, useCallback } from "react";
import { AppModule } from "../modules.types";
import { modulesService } from "../services/modules.service";
import config from "@/src/config";

interface ModulesContextData {
  modules: AppModule[];
  moduleOrder: string[];
  loading: boolean;
  toggleModule: (moduleId: string) => void;
  toggleFeature: (moduleId: string, featureId: string) => void;
  updateModuleOrder: (newOrder: string[]) => void;
  swapModuleFeatures: (
    moduleId: string,
    indexA: number,
    indexB: number,
  ) => void;
  changeFeatureMode: (
    moduleId: string,
    featureId: string,
    mode: "SIMPLE" | "ADVANCED",
  ) => void;
}

export const ModulesContext = createContext<ModulesContextData>(
  {} as ModulesContextData,
);

const STORAGE_KEY = config.modulesStorageKey;
const ORDER_KEY = config.modulesOrderKey;

export const ModulesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Inicialização LIMPA: Cache antigo estritamente proibido por segurança.
  // A interface aguardará a resposta oficial da API.
  const [modules, setModules] = useState<AppModule[]>([]);

  // Ordem de exibição pode ser mantida em cache, pois trata-se apenas de preferência visual de UI
  const [moduleOrder, setModuleOrder] = useState<string[]>(() => {
    try {
      const storedOrder = localStorage.getItem(ORDER_KEY);
      if (storedOrder) return JSON.parse(storedOrder);
    } catch (e) {
      console.warn("ModulesContext: Falha ao ler ordem dos módulos.", e);
    }
    return [];
  });

  // Inicia como TRUE para bloquear a renderização da tela com dados vazios ou não autorizados
  const [loading, setLoading] = useState(true);

  // Busca sincronizada com o Backend ao carregar a página e validação de sessão
  useEffect(() => {
    let isMounted = true;

    const carregarModulosDoBanco = async () => {
      setLoading(true);
      const modulosDoBanco = await modulesService.getModules();

      if (isMounted) {
        // Regra de Negócio: Se não retornar módulos ou ocorrer falha, força o LOGOUT
        if (!modulosDoBanco || modulosDoBanco.length === 0) {
          console.warn(
            "🛡️ Segurança: Nenhum módulo autorizado encontrado. Forçando logout.",
          );

          // Limpa chaves de sessão e configuração (Ajuste as chaves conforme o seu auth.service)
          localStorage.removeItem(config.configStorageKey);
          localStorage.removeItem(config.tokenStorageKey);
          localStorage.removeItem(config.modulesStorageKey);
          localStorage.removeItem(config.modulesOrderKey);

          window.location.hash = "#/auth";
          return;
        }

        // Caminho de Sucesso: Atualiza o estado com a fonte da verdade
        setModules(modulosDoBanco);

        // Mantém uma cópia limpa no storage apenas para consultas rápidas de UI (se necessário em outros cantos)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(modulosDoBanco));

        // Define a ordem padrão na primeira vez que o usuário carrega o sistema
        if (moduleOrder.length === 0) {
          const newOrder = modulosDoBanco.map((m) => m.id.toString());
          setModuleOrder(newOrder);
          localStorage.setItem(ORDER_KEY, JSON.stringify(newOrder));
        }

        setLoading(false);
      }
    };

    carregarModulosDoBanco();

    return () => {
      isMounted = false;
    };
  }, []);

  // Persistência isolada apenas para a Ordem de exibição da Interface
  useEffect(() => {
    if (moduleOrder.length > 0) {
      localStorage.setItem(ORDER_KEY, JSON.stringify(moduleOrder));
    }
  }, [moduleOrder]);

  const toggleModule = useCallback(
    (moduleId: string) => {
      const targetModule = modules.find((m) => m.id === moduleId);
      if (!targetModule) return;
      const newStatus = !targetModule.isEnabled;

      setModules((prev) =>
        prev.map((mod) => {
          if (mod.id === moduleId) {
            return {
              ...mod,
              isEnabled: newStatus,
              features: mod.features.map((feat) => ({
                ...feat,
                isEnabled: newStatus,
              })),
            };
          }
          return mod;
        }),
      );

      modulesService
        .saveModules(moduleId, null, newStatus)
        .then((freshModules) => {
          if (freshModules) setModules(freshModules);
        });
    },
    [modules],
  );

  const toggleFeature = useCallback(
    (moduleId: string, featureId: string) => {
      const targetModule = modules.find((m) => m.id === moduleId);
      const targetFeature = targetModule?.features.find(
        (f) => f.id === featureId,
      );
      if (!targetFeature) return;
      const newStatus = !targetFeature.isEnabled;

      setModules((prev) =>
        prev.map((mod) => {
          if (mod.id === moduleId) {
            return {
              ...mod,
              features: mod.features.map((feat) =>
                feat.id === featureId
                  ? { ...feat, isEnabled: newStatus }
                  : feat,
              ),
            };
          }
          return mod;
        }),
      );

      modulesService
        .saveModules(null, featureId, newStatus)
        .then((freshModules) => {
          if (freshModules) setModules(freshModules);
        });
    },
    [modules],
  );

  const updateModuleOrder = useCallback((newOrder: string[]) => {
    setModuleOrder(newOrder);
  }, []);

  const swapModuleFeatures = useCallback(
    (moduleId: string, indexA: number, indexB: number) => {
      setModules((prev) =>
        prev.map((mod) => {
          if (mod.id !== moduleId) return mod;
          const newFeatures = [...mod.features];
          if (
            indexA < 0 ||
            indexB < 0 ||
            indexA >= newFeatures.length ||
            indexB >= newFeatures.length
          )
            return mod;
          [newFeatures[indexA], newFeatures[indexB]] = [
            newFeatures[indexB],
            newFeatures[indexA],
          ];
          return { ...mod, features: newFeatures };
        }),
      );
    },
    [],
  );

  // Altera o modo de experiência e salva na API
  const changeFeatureMode = useCallback(
    (moduleId: string, featureId: string, mode: "SIMPLE" | "ADVANCED") => {
      // 1. Atualização Otimista (Muda na tela na hora)
      setModules((prev) =>
        prev.map((mod) => {
          if (mod.id === moduleId) {
            return {
              ...mod,
              features: mod.features.map((feat) =>
                feat.id === featureId
                  ? { ...feat, experienceMode: mode }
                  : feat,
              ),
            };
          }
          return mod;
        }),
      );

      // 2. Salva em background no Banco de Dados
      const userConfig = JSON.parse(
        localStorage.getItem(config.configStorageKey) || "{}",
      );
      const userId = userConfig.user_id;

      if (userId) {
        modulesService
          .setFeatureMode(userId, parseInt(featureId), mode)
          .then((freshModules) => {
            if (freshModules) setModules(freshModules); // Sincroniza com a verdade do backend
          })
          .catch((err) =>
            console.error("Erro ao salvar modo da funcionalidade", err),
          );
      }
    },
    [],
  );

  return (
    <ModulesContext.Provider
      value={{
        modules,
        moduleOrder,
        loading,
        toggleModule,
        toggleFeature,
        updateModuleOrder,
        swapModuleFeatures,
        changeFeatureMode,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};
