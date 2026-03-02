import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../ai.types";
import { INITIAL_CHAT_HISTORY } from "../ai.data";
import { aiService } from "../services/ai.service";

/**
 * @author HallTech AI
 * Hook de lógica do Chat.
 */
export const useAiChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_HISTORY);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  /**
   * Envia uma mensagem.
   * @param text (Opcional) Texto direto. Se não fornecido, usa o inputText.
   */
  const handleSendMessage = async (text?: string | React.FormEvent) => {
    // Se for evento de form, previne default
    if (text && typeof text === 'object' && 'preventDefault' in text) {
      (text as React.FormEvent).preventDefault();
    }

    const contentToSend = typeof text === 'string' ? text : inputText;

    if (!contentToSend.trim() || isLoading) return;

    setInputText(""); // Limpa input visualmente

    // 1. Adiciona mensagem do usuário
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: contentToSend.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Chama o serviço de IA
      const historyForAi = [...messages, userMsg];
      const aiResponseText = await aiService.sendMessage(contentToSend, historyForAi);

      // 3. Adiciona resposta da IA
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro na comunicação. Tente novamente.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    inputText,
    setInputText,
    handleSendMessage,
    messagesEndRef
  };
};