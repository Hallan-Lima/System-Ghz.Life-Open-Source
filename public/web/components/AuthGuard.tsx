
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; // Importa Outlet
import { authService } from '../features/auth/services/auth.service';

/**
 * @author HallTech AI
 * Componente de guarda de rota para verificar autenticação.
 * Redireciona para a página de login se o usuário não estiver autenticado.
 */
interface AuthGuardProps {
  children?: React.ReactNode; // Feito por IA: Torna 'children' opcional para compatibilidade com <Route element={...} />
}

const AuthGuard: React.FC<AuthGuardProps> = () => { 
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!authService.isAuthenticated()) {
        navigate('/auth', { replace: true });
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [navigate]);

  if (checkingAuth) {
    // Renderiza um spinner ou tela de carregamento enquanto verifica a autenticação
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
            <i className="fas fa-spinner animate-spin text-indigo-600 text-4xl"></i>
        </div>
    );
  }

  // Se estiver autenticado, renderiza os filhos via Outlet
  // Feito por IA: Uso de <Outlet /> para renderizar as rotas aninhadas
  return <Outlet />; 
};

export default AuthGuard;