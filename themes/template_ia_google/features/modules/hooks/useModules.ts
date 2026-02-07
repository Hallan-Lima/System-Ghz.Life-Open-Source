import { useContext } from "react";
import { ModulesContext } from "../context/ModulesContext";

/**
 * @author HallTech AI
 * Hook para acessar o contexto de Módulos.
 * Garante acesso ao estado global de configuração (Feature Flags).
 */
export const useModules = () => {
  const context = useContext(ModulesContext);

  if (!context) {
    throw new Error("useModules deve ser usado dentro de um ModulesProvider");
  }

  return context;
};
