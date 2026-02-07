/**
 * @author HallTech AI
 * Tipos para o módulo de Inteligência Artificial (Chatbot).
 */

export type SenderType = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  text: string;
  sender: SenderType;
  timestamp: Date;
  isTyping?: boolean; // Para animação de "digitando..."
}

export interface AiContextData {
  financeSummary: any;
  pendingTasks: any[];
  healthStats: any;
  userProfile: any;
}