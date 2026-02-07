import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../../features/modules/hooks/useModules';

interface ModuleGuardProps {
  moduleId: string;
  children: React.ReactNode;
}

/**
 * @author HallTech AI
 * HOC/Componente Wrapper que protege rotas.
 * Se o módulo especificado estiver desativado, redireciona o usuário para a Home.
 */
const ModuleGuard: React.FC<ModuleGuardProps> = ({ moduleId, children }) => {
  const { modules, loading } = useModules();
  const navigate = useNavigate();

  useEffect(() => {
    // Só verifica quando terminar de carregar as configurações
    if (!loading) {
      const module = modules.find(m => m.id === moduleId);
      
      // Se não encontrar o módulo ou ele estiver desativado
      if (!module || !module.isEnabled) {
        console.warn(`[ModuleGuard] Acesso negado ao módulo: ${moduleId}. Redirecionando...`);
        navigate('/', { replace: true });
      }
    }
  }, [modules, loading, moduleId, navigate]);

  if (loading) {
    // Estado de carregamento minimalista enquanto verifica permissão
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"></div>;
  }

  // Se passou na verificação (ou ainda está renderizando antes do useEffect disparar), renderiza o filho.
  // O useEffect cuidará do redirecionamento se necessário.
  const isEnabled = modules.find(m => m.id === moduleId)?.isEnabled;
  
  if (!isEnabled) return null;

  return <>{children}</>;
};

export default ModuleGuard;
