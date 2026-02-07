import { AppModule } from "../modules.types";
import { defaultModules } from "../modules.data";

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
    // Simula delay de leitura
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Erro ao ler configuração de módulos", e);
    }
    
    // Fallback para padrão se não houver salvo
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultModules));
    return defaultModules;
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
