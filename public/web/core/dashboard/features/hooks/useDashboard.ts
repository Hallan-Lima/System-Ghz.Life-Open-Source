import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboard.service";
import { tasksService } from "@/modules/tasks/features/services/tasks.service"; // Importação do serviço real
import { dashboardMocks } from "../dashboard.data";
import { Task } from "@/modules/tasks/domain/tasks.types";

/**
 * @author HallTech AI
 * Hook que gerencia o ciclo de vida e interações do Dashboard.
 */
export const useDashboard = () => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<string>("Analisando dados...");
  const [loadingInsight, setLoadingInsight] = useState(true);
  
  // Estado local para dados dinâmicos
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Dados estáticos (ainda usados para Finance/Health por enquanto, mas Tasks agora é dinâmico)
  const staticData = dashboardMocks;

  useEffect(() => {
    let mounted = true;

    // 1. Carrega Tarefas Reais do LocalStorage
    const loadRealTasks = async () => {
      try {
        const realTasks = await tasksService.getTasks();
        if (mounted) {
          setTasks(realTasks);
          setLoadingTasks(false);
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas no dashboard", error);
      }
    };

    // 2. Gera Insights com base nos dados
    const loadInsights = async () => {
      try {
        const result = await dashboardService.fetchInsights();
        if (mounted) {
          setInsight(result);
          setLoadingInsight(false);
        }
      } catch (error) {
        if (mounted) {
          setInsight("Concentre-se no hoje! Revise suas metas e mantenha o equilíbrio.");
          setLoadingInsight(false);
        }
      }
    };

    loadRealTasks();
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
    data: {
        ...staticData,
        tasks: tasks // Sobrescreve as tasks do mock com as reais
    }, 
    loadingTasks,
    handleNavigate,
  };
};