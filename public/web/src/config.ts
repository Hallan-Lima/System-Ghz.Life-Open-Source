/**
 * @author HallTech AI
 * Centraliza o acesso às variáveis de ambiente do projeto (Vite).
 */

interface Config {
  apiBaseUrl: string;
  geminiApiKey: string;
  isProduction: boolean;
}

const config: Config = {
  // No Vite, usamos import.meta.env
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  isProduction: import.meta.env.MODE === 'production',
};

export default config;