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
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  apiKey: process.env.API_KEY || '',
  isProduction: process.env.NODE_ENV === 'production',
};

export default config;