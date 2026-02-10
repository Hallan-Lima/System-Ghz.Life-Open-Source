import { authMetadata } from "../auth.data";
import { RegisterState } from "../auth.types";
import { api } from "../../../services/api";

/**
 * @author HallTech AI
 * Serviço responsável pela comunicação (simulada) com o backend de autenticação.
 */
class AuthService {
  /**
   * login do usuário.
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @returns Promise que resolve se o login for bem-sucedido.
   */
  async login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação contra os dados mockados
        const user = authMetadata.testUsers.find(
          (u) => u.email === email && u.password === password,
        );

        // Verifica se o usuário existe nos mocks
        if (user) {
          resolve();
        } else {
          reject(new Error(authMetadata.messages.loginError));
        }
      }, 1200);
    });
  }

  /**
   * registro de um novo usuário.
   * @param data Dados do formulário de registro.
   * @returns Promise que resolve se o registro for bem-sucedido.
   */
  async register(data: RegisterState): Promise<void> {
    const response = await api.post("/auth/register", data);
    if (response.status === 201) {
      localStorage.setItem("userConfig", JSON.stringify(data));
      return;
    } else {
      // TODO: Implementar notificação no frontend
      throw new Error("Erro no registro. Tente novamente.");
    }
  }
}

export const authService = new AuthService();
