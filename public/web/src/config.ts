/**
 * @author HallTech AI
 * Centraliza o acesso às variáveis de ambiente do projeto (Vite).
 */

interface Config {
  apiBaseUrl: string;
  geminiApiKey: string;
  isProduction: boolean;
  modulesStorageKey: string;
  modulesOrderKey: string;
}

const config: Config = {
  // No Vite, usamos import.meta.env
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  isProduction: import.meta.env.MODE === 'production',
  modulesStorageKey: import.meta.env.VITE_MODULES_STORAGE_KEY || 'ghz_modules_config_v1',
  modulesOrderKey: import.meta.env.VITE_MODULES_ORDER_KEY || 'ghz_modules_order_v1',
};

export default config;