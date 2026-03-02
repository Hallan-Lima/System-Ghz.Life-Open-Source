import React from "react";
import AiView from '@/modules/ai/features/components/AiView';
import ModuleGuard from '@/shared/ui/layout/ModuleGuard';

/**
 * @author HallTech AI
 * Página da Inteligência Artificial.
 */
const AiPage: React.FC = () => {
  return (
    <ModuleGuard routePath="/ia">
      <AiView />
    </ModuleGuard>
  );
};

export default AiPage;
