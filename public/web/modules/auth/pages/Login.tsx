import React, { useState } from "react";
import OnboardingSlider from '@/modules/auth/features/components/OnboardingSlider';
import LoginForm from '@/modules/auth/features/components/LoginForm';

/**
 * @author HallTech AI
 * Página de Login.
 * Atua como container para os componentes da feature de Auth.
 */
const LoginPage: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  if (showLoginForm) {
    return <LoginForm onClose={() => setShowLoginForm(false)} />;
  }

  return <OnboardingSlider onLoginClick={() => setShowLoginForm(true)} />;
};

export default LoginPage;