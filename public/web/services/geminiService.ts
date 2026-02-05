
import { GoogleGenAI } from "@google/genai";
import { Transaction, Task, HealthStats } from "../domain/types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGhzAssistantInsights = async (
  transactions: Transaction[], 
  tasks: Task[], 
  health: HealthStats
): Promise<string> => {
  const prompt = `
    Você é o assistente inteligente Ghz.Life da startup HallTech.
    Sua missão é ajudar o usuário a equilibrar vida financeira, produtividade e saúde.
    
    Dados Atuais:
    - Finanças: ${JSON.stringify(transactions)}
    - Tarefas: ${JSON.stringify(tasks)}
    - Saúde (Água): ${health.waterIntake}L de uma meta de ${health.waterGoal}L.
    
    Por favor, forneça um insight curto, motivador e prático (máximo 3 frases) em português.
    Foque em uma conexão entre as áreas (ex: 'Beba mais água para ter foco e terminar suas tarefas' ou 'Economize hoje para seu objetivo de longo prazo').
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Estou aqui para ajudar você a fluir melhor hoje!";
  } catch (error) {
    console.error("Ghz.Life AI Error:", error);
    return "Mantenha o foco em seus objetivos! Beba água e revise suas finanças.";
  }
};
