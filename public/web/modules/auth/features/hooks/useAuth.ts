import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/modules/auth/features/services/auth.service";

/**
 * @author HallTech AI
 * Hook para gerenciar a lógica de login.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (e: React.FormEvent, email: string, pass: string) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, pass);
      window.location.href = "#/dashboard";
      window.location.reload();
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};