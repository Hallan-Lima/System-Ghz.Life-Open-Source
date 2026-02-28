/**
 * @author HallTech AI
 * Centraliza o acesso às variáveis de ambiente do projeto (Vite).
 */

interface Config {
  geminiApiKey: string;
  modulesStorageKey: string;
  modulesOrderKey: string;
  configStorageKey: string;
  tokenStorageKey: string;
  tasksStorageKey: string;
}

const config: Config = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  modulesStorageKey: import.meta.env.VITE_STORAGE_MODULES_KEY || 'ghz_modules_config_v1',
  modulesOrderKey: import.meta.env.VITE_STORAGE_MODULES_ORDER_KEY || 'ghz_modules_order_v1',
  configStorageKey: import.meta.env.VITE_STORAGE_CONFIG_USER || 'ghz_user_config_v1',
  tokenStorageKey: import.meta.env.VITE_STORAGE_TOKEN || 'ghz_user_token_v1',
  tasksStorageKey: import.meta.env.VITE_STORAGE_TASKS || 'ghz_tasks_db_v1',
};

export default config;