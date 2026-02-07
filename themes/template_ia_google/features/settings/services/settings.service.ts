import { settingsMocks } from "../settings.data";
import { UserProfile } from "../settings.types";

/**
 * @author HallTech AI
 * Serviço para gerenciamento de configurações e perfil.
 */
export const settingsService = {
  /**
   * Obtém o perfil do usuário logado.
   * Tenta carregar as informações atualizadas do armazenamento local,
   * usando o mock (settings.data.ts) apenas como valor inicial/fallback.
   */
  getUserProfile: async (): Promise<UserProfile> => {
    // Simulação de delay imperceptível
    // await new Promise(resolve => setTimeout(resolve, 50));

    try {
      // Busca dados salvos pelo EditProfile (useEditProfile.ts)
      const storedData = localStorage.getItem("userConfig");
      
      if (storedData) {
        const parsed = JSON.parse(storedData);
        
        // Lógica de exibição do nome: Nome + Sobrenome, ou Nickname, ou fallback
        let displayName = parsed.nickname;
        if (parsed.firstName || parsed.lastName) {
            displayName = `${parsed.firstName || ''} ${parsed.lastName || ''}`.trim();
        }

        // Se não tiver nome definido no storage, usa o do mock
        if (!displayName) {
            displayName = settingsMocks.user.name;
        }

        return {
          ...settingsMocks.user, // Mantém avatarIcon e plan do mock base
          name: displayName,
          // Aqui poderíamos mapear o plano se existisse no registro, por enquanto fixa do mock
          plan: settingsMocks.user.plan 
        };
      }
    } catch (error) {
      console.warn("SettingsService: Falha ao ler dados locais do usuário.", error);
    }

    // Se não houver dados locais, retorna o mock estático
    return settingsMocks.user;
  }
};
