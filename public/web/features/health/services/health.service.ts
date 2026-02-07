import { healthMocks } from "../health.data";
import { HealthDashboardData } from "../health.types";

/**
 * @author HallTech AI
 * Serviço para gerenciamento de dados de saúde.
 */
export const healthService = {
  /**
   * Obtém os dados de saúde (Água, Remédios, Consultas).
   */
  getHealthData: async (): Promise<HealthDashboardData> => {
    // Simulação de delay
    // await new Promise(resolve => setTimeout(resolve, 300));
    return { ...healthMocks };
  },

  /**
   * Simula o registro de ingestão de água.
   */
  addWater: async (amount: number): Promise<void> => {
    console.log(`Service: Adicionado ${amount}ml de água.`);
    return Promise.resolve();
  },

  /**
   * Simula a marcação de medicamento como tomado.
   */
  toggleMedicine: async (id: string): Promise<void> => {
    console.log(`Service: Medicamento ${id} alternado.`);
    return Promise.resolve();
  }
};