import React from "react";
import AiView from "../features/ai/components/AiView";
import ModuleGuard from "../components/layout/ModuleGuard";

/**
 * @author HallTech AI
 * Página da Inteligência Artificial.
 */
const AiPage: React.FC = () => {
  return (
    <ModuleGuard moduleId="ai_assistant">
      <AiView />
    </ModuleGuard>
  );
};

export default AiPage;
