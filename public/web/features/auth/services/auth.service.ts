import { api } from "../../../services/api";
import { storage } from "../../../services/storage";
import { RegisterState } from "../auth.types";

class AuthService {
  async login(email: string, password: string): Promise<void> {
    // 1. Chama a API
    const response = await api.post("/auth/login", { email, password });

    // 2. Verifica sucesso baseada na estrutura do PHP
    if (response.data && response.data.success) {
      const responseData = response.data.data;

      // 3. Salva as configurações do usuário
      if (responseData.userConfig) {
        storage.setJson("userConfig", responseData.userConfig);
      }

      // 4. Salva a configuração dos módulos (Menu dinâmico)
      if (responseData.modulesConfig) {
        storage.setJson("modulesConfig", responseData.modulesConfig);
      }

      // Se você implementar JWT no futuro, salvaria o token aqui:
      // if (responseData.token) storage.setItem("auth_token", responseData.token);

      return;
    } else {
      throw new Error(response.data.message || "Falha ao realizar login.");
    }
  }

  async logout(): Promise<void> {
    // Limpa tudo ao sair
    storage.clear();
    window.location.href = "/login";
  }
  
  // Verifica se está logado (simples verificação se tem dados)
  isAuthenticated(): boolean {
    return !!storage.getItem("userConfig");
  }
  /**
   * registro de um novo usuário.
   * @param data Dados do formulário de registro.
   * @returns Promise que resolve se o registro for bem-sucedido.
   */
  async register(data: RegisterState): Promise<void> {
    const response = await api.post("/auth/register", data);
    if (response.status === 201) {
      storage.setJson("userConfig", data);
      return;
    } else {
      // TODO: Implementar notificação no frontend
      throw new Error("Erro no registro. Tente novamente.");
    }
  }
}

export const authService = new AuthService();