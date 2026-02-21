import { api } from "../../../services/api";
import { storage } from "../../../services/storage";
import { RegisterState } from "../auth.types";
import config from "../../../src/config";

class AuthService {
  async login(email: string, password: string): Promise<void> {
    // 1. Chama a API
    const response = await api.post("/auth/login", { email, password });

    // 2. Verifica sucesso baseada na estrutura do PHP
    if (response.data && response.data.success) {
      const responseData = response.data.data;

      // 3. Salva as configurações do usuário
      if (responseData.userConfig) {
        storage.setJson(config.configStorageKey, responseData.userConfig);
      }

      if (responseData.refresh_token) {
        storage.setJson("refresh_token", responseData.refresh_token);
      }

      // 4. Salva a configuração dos módulos (Menu dinâmico)
      if (responseData.modulesConfig) {
        storage.setJson(config.modulesStorageKey, responseData.modulesConfig);
      }

      return;
    } else {
      throw new Error(response.data.message || "Falha ao realizar login.");
    }
  }

  async logout(): Promise<void> {
    storage.clear();
    window.location.href = "/";
  }

  /**
   * Verifica se o usuário está autenticado pela presença dos tokens no localStorage.
   * @returns `true` se ambos os tokens estiverem presentes, `false` caso contrário.
   */
  isAuthenticated(): boolean {
    return (
      !!storage.getItem("refresh_token")
    );
  }
  /**
   * registro de um novo usuário.
   * @param data Dados do formulário de registro.
   * @returns Promise que resolve se o registro for bem-sucedido.
   */
  async register(data: RegisterState): Promise<void> {
    const response = await api.post("/auth/register", data);
    if (response.status === 201) {
      storage.setJson(config.configStorageKey, data);
      return;
    } else {
      // TODO: Implementar notificação no frontend
      throw new Error("Erro no registro. Tente novamente.");
    }
  }
}

export const authService = new AuthService();