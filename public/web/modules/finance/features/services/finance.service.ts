import { financeMocks } from "../finance.data";

/**
 * @author HallTech AI
 * Serviço para operações financeiras.
 */
export const financeService = {
  /**
   * Obtém os dados financeiros (Resumo e Transações).
   * Simula uma chamada assíncrona.
   */
  getFinanceData: async () => {
    // Simulação de delay de rede
    // await new Promise(resolve => setTimeout(resolve, 300));
    return financeMocks;
  }
};