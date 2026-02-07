import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboard.service";
import { dashboardMocks } from "../dashboard.data";

/**
 * @author HallTech AI
 * Hook que gerencia o ciclo de vida e interações do Dashboard.
 */
export const useDashboard = () => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<string>("Analisando dados...");
  const [loadingInsight, setLoadingInsight] = useState(true);

  // Carrega os dados (no momento estáticos via import, mas preparado para async)
  const data = dashboardMocks;

  useEffect(() => {
    let mounted = true;

    const loadInsights = async () => {
      try {
        const result = await dashboardService.fetchInsights();
        if (mounted) {
          setInsight(result);
          setLoadingInsight(false);
        }
      } catch (error) {
        if (mounted) {
          setInsight("Não foi possível gerar insights no momento.");
          setLoadingInsight(false);
        }
      }
    };

    loadInsights();

    return () => {
      mounted = false;
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return {
    insight,
    loadingInsight,
    data,
    handleNavigate,
  };
};