import { AppModule } from "../modules.types";
import { defaultModules } from "../modules.data";
import { api } from "../../../services/api";

const STORAGE_KEY = "ghz_modules_config_v1";

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
      const response = await api.get('modules');
      
      if (response.data && response.data.success) {
        return response.data.data;
      }
      
      return defaultModules;
    } catch (e) {
      console.error("Erro ao carregar módulos da API, usando fallback:", e);
      // Fallback silencioso para não travar o cadastro se a API falhar
      return defaultModules;
    }
  },

  /**
   * Salva a configuração completa.
   */
  saveModules: async (modules: AppModule[]): Promise<void> => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
    } catch (e) {
      console.error("Erro ao salvar configuração de módulos", e);
    }
  }
};
