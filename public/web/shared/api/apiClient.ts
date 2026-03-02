import axios from 'axios';

// Cria a instância do Axios apontando para sua API PHP
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional: Se já tiver token salvo, envia automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token'); // Vamos padronizar esse nome
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});