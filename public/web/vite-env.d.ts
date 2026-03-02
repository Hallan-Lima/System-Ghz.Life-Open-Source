/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string
    readonly VITE_STORAGE_MODULES_KEY: string
    readonly VITE_STORAGE_MODULES_ORDER_KEY: string
    readonly VITE_STORAGE_CONFIG_USER: string
    readonly VITE_STORAGE_TOKEN: string
    readonly VITE_STORAGE_TASKS: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
