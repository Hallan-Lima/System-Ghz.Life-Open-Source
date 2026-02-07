import { authMetadata } from "../auth.data";
import { RegisterState } from "../auth.types";

/**
 * @author HallTech AI
 * Serviço responsável pela comunicação (simulada) com o backend de autenticação.
 */
class AuthService {
  /**
   * Simula o login do usuário.
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @returns Promise que resolve se o login for bem-sucedido.
   */
  async login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação contra os dados mockados
        const user = authMetadata.testUsers.find(u => u.email === email && u.password === password);
        
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
   * Simula o registro de um novo usuário.
   * @param data Dados do formulário de registro.
   * @returns Promise que resolve se o registro for bem-sucedido.
   */
  async register(data: RegisterState): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Dados de registro enviados:", data);
        localStorage.setItem("userConfig", JSON.stringify(data));
        resolve();
      }, 2000);
    });
  }
}

export const authService = new AuthService();