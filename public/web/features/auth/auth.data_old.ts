/**
 * @author HallTech AI
 * Dados estáticos mockados para autenticação.
 * Substitui o antigo temp_metadata.json para melhor compatibilidade com ambientes ESM.
 */
export const authMetadata = {
  testUsers: [
    {
      email: "teste@ghz.life",
      password: "123",
      name: "Usuário Teste"
    }
  ],
  messages: {
    loginSuccess: "Login realizado com sucesso!",
    loginError: "Credenciais inválidas. Tente novamente.",
    registerSuccess: "Conta criada com sucesso! Bem-vindo.",
    registerError: "Erro ao criar conta. Tente mais tarde."
  }
};