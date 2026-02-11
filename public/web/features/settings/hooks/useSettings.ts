import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { settingsService } from "../services/settings.service";
import { UserProfile } from "../settings.types";
import { authService } from "@/features/auth/services/auth.service";

/**
 * @author HallTech AI
 * Hook principal da feature de Configurações.
 * Gerencia o Dark Mode e o carregamento de dados do usuário.
 */
export const useSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Inicializa o estado lendo o DOM ou LocalStorage para evitar flash de tema errado
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const loadData = async () => {
      const profile = await settingsService.getUserProfile();
      setUser(profile);
    };
    loadData();
  }, []);

  /**
   * Alterna entre modo claro e escuro, persistindo no localStorage e no DOM.
   */
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/auth'); 
  };

  return {
    user,
    isDarkMode,
    toggleDarkMode,
    handleLogout
  };
};