/**
 * @author HallTech AI
 * Dados agregados de saúde do usuário para o Dashboard e IA.
 */
export interface HealthStats {
  waterIntake: number; // Consumo atual (Litros)
  waterGoal: number;   // Meta diária (Litros)
  lastMedication?: {
    name: string;
    time: string;
  };
}
