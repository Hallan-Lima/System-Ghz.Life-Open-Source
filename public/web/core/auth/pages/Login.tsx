import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/core/auth/features/services/auth.service";
import OnboardingSlider from '@/core/auth/features/components/OnboardingSlider';
import LoginForm from '@/core/auth/features/components/LoginForm';

/**
 * @author HallTech AI
 * Página de Login.
 * Atua como container para os componentes da feature de Auth.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    // Redireciona usuários logados diretamente para o painel evitando de mostrar a apresentação
    if (authService.isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  if (showLoginForm) {
    return <LoginForm onClose={() => setShowLoginForm(false)} />;
  }

  return <OnboardingSlider onLoginClick={() => setShowLoginForm(true)} />;
};

export default LoginPage;