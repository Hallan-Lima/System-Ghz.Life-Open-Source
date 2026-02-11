import { HealthDashboardData } from "./health.types";

/**
 * @author HallTech AI
 * Dados iniciais para o módulo de saúde.
 */
export const healthMocks: HealthDashboardData = {
  water: {
    current: 1600,
    goal: 2000
  },
  medicines: [
    { id: '1', name: 'Vitamina D', time: '08:00', completed: true },
    { id: '2', name: 'Ômega 3', time: '12:00', completed: false },
    { id: '3', name: 'Magnésio', time: '21:00', completed: false },
  ],
  nextAppointment: {
    doctorName: "Dra. Jéssica Camargo",
    specialty: "medical", 
    date: "05 de Outubro",
    time: "14:00"
  }
};