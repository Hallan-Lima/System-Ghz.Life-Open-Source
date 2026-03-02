import { UserProfile } from "./settings.types";

/**
 * @author HallTech AI
 * Dados mockados do usuário logado para a tela de configurações.
 * ATENÇÃO: Este arquivo serve como estado INICIAL. 
 * As atualizações feitas pelo usuário são salvas no LocalStorage e recuperadas pelo settings.service.ts.
 */
export const settingsMocks: { user: UserProfile } = {
  user: {
    name: "", // Nome padrão inicial
    plan: "",
    avatarIcon: ""
  }
};
