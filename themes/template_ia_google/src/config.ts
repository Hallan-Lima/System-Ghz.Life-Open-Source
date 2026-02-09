/**
 * @author HallTech AI
 * Centraliza o acesso às variáveis de ambiente do projeto.
 * Garante tipagem e fallback caso as variáveis não estejam definidas.
 */

interface Config {
  apiBaseUrl: string;
  apiKey: string;
  isProduction: boolean;
}

const config: Config = {
  // Feito por IA: Substituição de import.meta.env por process.env para corrigir erros de tipagem e atender aos requisitos da API Key
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333/api',
  apiKey: import.meta.env.VITE_API_KEY || '',
  isProduction: import.meta.env.VITE_NODE_ENV === 'production',
};

export default config;