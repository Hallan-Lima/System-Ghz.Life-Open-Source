/**
 * @author HallTech AI
 * Interface para o perfil do usuário exibido nas configurações.
 */
export interface UserProfile {
  name: string;
  plan: string;
  avatarIcon: string;
}

/**
 * @author HallTech AI
 * Interface para o estado das configurações.
 */
export interface SettingsState {
  isDarkMode: boolean;
}