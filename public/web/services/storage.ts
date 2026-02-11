/**
 * Storage Service (Adapter Pattern)
 * * Atualmente usa localStorage (Web).
 * No futuro, para migrar para App Mobile, basta alterar este arquivo 
 * para usar AsyncStorage ou SecureStore, sem quebrar o resto do sistema.
 */

export const storage = {
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Erro ao ler do storage:', error);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do storage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
    }
  },
  
  // Helpers para JSON
  setJson: (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Erro ao salvar JSON:', error);
    }
  },

  getJson: <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao ler JSON:', error);
      return null;
    }
  }
};