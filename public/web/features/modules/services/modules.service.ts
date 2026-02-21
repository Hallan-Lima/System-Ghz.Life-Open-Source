import { AppModule } from "../modules.types";
import { api } from "../../../services/api";
import { storage } from "../../../services/storage";
import config from "../../../src/config";

/**
 * @author HallTech AI
 * Serviço para gerenciamento de Feature Flags e Módulos.
 */
export const modulesService = {
  /**
   * Recupera a configuração atual dos módulos.
   */
    getModules: async (): Promise<AppModule[]> => {
    try {
      const response = await api.get("modules");

      if (response.data && response.data.success) {
        return response.data.data;
      }

      return []; // Sem fallback falso. Retorna vazio se der erro.
    } catch (e) {
      console.error("Erro ao carregar módulos da API:", e);
      return [];
    }
  },

  saveModules: async (
    moduleId: string | null,
    featureId: string | null,
    isActive: boolean,
  ): Promise<AppModule[] | null> => {
    try {
      const userConfig = storage.getJson<any>(config.configStorageKey);
      const userId = userConfig?.user_id;

      if (!userId) {
        console.error("Usuário não encontrado na sessão local.");
        return null;
      }

      const modIdInt = moduleId ? parseInt(moduleId, 10) : null;
      const featIdInt = featureId ? parseInt(featureId, 10) : null;

      if ((moduleId && isNaN(modIdInt as number)) || (featureId && isNaN(featIdInt as number))) {
          console.error(`ERRO: O ID do Módulo (${moduleId}) ou Feature (${featureId}) não é um número. Eles devem bater com o ID da tabela do Banco de Dados!`);
          return null; 
      }

      const payload = {
        user_id: userId,
        module_id: modIdInt,
        functionality_id: featIdInt,
        is_active: isActive,
      };
      
      const response = await api.post("modules/toggle", payload);

      if (response.data && response.data.success) {
        const updatedModules = response.data.data;
        storage.setJson(config.modulesStorageKey, updatedModules);
        return updatedModules;
      }

      return null;
    } catch (e) {
      console.error("Erro ao salvar configuração de módulos no backend", e);
      return null;
    }
  },
};