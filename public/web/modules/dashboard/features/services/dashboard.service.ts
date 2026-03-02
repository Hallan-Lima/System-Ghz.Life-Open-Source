import { dashboardMocks } from "../dashboard.data";
import { getGhzAssistantInsights } from "@/modules/ai/features/services/ai.service";

/**
 * @author HallTech AI
 * Serviço responsável por agregar dados para o Dashboard.
 */
export const dashboardService = {
  /**
   * Recupera todos os dados necessários para o dashboard (Financeiro, Tarefas, Saúde).
   * Em produção, isso chamaria múltiplos endpoints ou um endpoint agregado.
   */
  getDashboardData: async () => {
    // Simulação de delay de rede
    // await new Promise(resolve => setTimeout(resolve, 500));
    return dashboardMocks;
  },

  /**
   * Solicita um insight da IA com base nos dados atuais.
   */
  fetchInsights: async () => {
    const { transactions, tasks, health } = dashboardMocks;
    return await getGhzAssistantInsights(transactions, tasks, health);
  }
};