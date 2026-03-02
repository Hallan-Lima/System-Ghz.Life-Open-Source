import { ChatMessage } from "./ai.types";

/**
 * @author HallTech AI
 * Mensagem inicial de boas-vindas do Chatbot.
 */
export const INITIAL_CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'welcome-msg',
    text: "Olá! Sou a IA do Ghz.Life. Analisei seus dados de finanças, saúde e tarefas. Como posso te ajudar a organizar sua vida hoje?",
    sender: 'ai',
    timestamp: new Date()
  }
];