import { settingsMocks } from "../settings.data";
import { UserProfile } from "../settings.types";

/**
 * @author HallTech AI
 * Serviço para gerenciamento de configurações e perfil.
 */
export const settingsService = {
  /**
   * Obtém o perfil do usuário logado.
   */
  getUserProfile: async (): Promise<UserProfile> => {
    // Simulação de delay
    // await new Promise(resolve => setTimeout(resolve, 200));
    return settingsMocks.user;
  }
};