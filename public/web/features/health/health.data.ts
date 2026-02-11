import { HealthDashboardData } from "./health.types";

/**
 * @author HallTech AI
 * Dados iniciais para o módulo de saúde.
 */
export const healthMocks: HealthDashboardData = {
  water: {
    current: 0,
    goal: 0
  },
  medicines: [
  
  ],
  nextAppointment: {
    doctorName: "",
    specialty: "", 
    date: "",
    time: ""
  }
};