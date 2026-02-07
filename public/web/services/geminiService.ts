import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../domain/finance.types";
import { Task } from "../domain/tasks.types";
import { HealthStats } from "../domain/health.types";

/**
 * @author HallTech AI
 * Serviço de Inteligência Artificial utilizando Google Gemini.
 * Responsável por gerar insights cruzando dados de Finanças, Saúde e Produtividade.
 */

// Inicialização do cliente Gemini com a chave de API do ambiente
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Gera um insight curto e motivacional com base no estado atual do usuário.
 * 
 * @param transactions Lista de transações financeiras recentes.
 * @param tasks Lista de tarefas e metas.
 * @param health Estatísticas de saúde (água, etc).
 * @returns Uma string com o conselho gerado pela IA.
 */
export const getGhzAssistantInsights = async (
  transactions: Transaction[], 
  tasks: Task[], 
  health: HealthStats
): Promise<string> => {
  // Construção do Prompt de Contexto Otimizado
  const prompt = `
    Atue como o assistente pessoal inteligente do app "Ghz.Life".
    Seu tom deve ser: Motivador, Direto e Prático (Max 3 frases).
    Idioma: Português do Brasil.

    CONTEXTO DO USUÁRIO:
    1. Finanças: ${JSON.stringify(transactions.slice(0, 5))} (Resumo recente)
    2. Produtividade: ${JSON.stringify(tasks.slice(0, 5))} (Tarefas principais)
    3. Saúde: Ingeriu ${health.waterIntake}L de água (Meta: ${health.waterGoal}L).

    OBJETIVO:
    Gere um "Insight do Dia" que conecte pelo menos dois desses pilares se possível, ou foque no ponto mais crítico.
    Exemplo: "Ótimo foco nas tarefas! Que tal beber um pouco mais de água para manter esse ritmo e economizar para sua meta?"
    
    Se os dados forem escassos, forneça uma dica geral de equilíbrio entre mente, corpo e bolso.
  `;

  try {
    // Chamada à API Gemini utilizando o modelo Flash para baixa latência
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    // Retorna o texto gerado ou uma mensagem padrão caso venha vazio
    return response.text || "Mantenha o equilíbrio. Estou analisando seus dados para insights futuros!";
  } catch (error) {
    console.error("Erro no serviço Ghz AI:", error);
    // Fallback gracioso em caso de erro (ex: sem chave de API ou erro de rede)
    return "Concentre-se no hoje! Beba água, revise suas metas e mantenha o controle financeiro.";
  }
};