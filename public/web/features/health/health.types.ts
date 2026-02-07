/**
 * @author HallTech AI
 * Interface para medicamentos e suplementos.
 */
export interface Medicine {
  id: string;
  name: string;
  time: string;
  completed: boolean;
}

/**
 * @author HallTech AI
 * Interface para consultas médicas.
 */
export interface Appointment {
  doctorName: string;
  specialty: string; // Ex: Cardiologista, Nutricionista (implícito no ícone/contexto)
  date: string;
  time: string;
}

/**
 * @author HallTech AI
 * Estrutura completa dos dados da tela de saúde.
 */
export interface HealthDashboardData {
  water: {
    current: number; // em ml
    goal: number;    // em ml
  };
  medicines: Medicine[];
  nextAppointment: Appointment;
}