import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../domain/finance.types";
import { Task } from "../domain/tasks.types";
import { HealthStats } from "../domain/health.types";
import config from "../src/config";

/**
 * @author HallTech AI
 * Serviço de Inteligência Artificial utilizando Google Gemini.
 * Responsável por gerar insights cruzando dados de Finanças, Saúde e Produtividade.
 */

// Inicialização do cliente Gemini com a chave de API via variável de ambiente
const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

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

  if (!ai) {
    console.warn("Ghz AI: API Key não configurada.");
    return "Concentre-se no hoje! Beba água, revise suas metas e mantenha o controle financeiro.";
  }

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
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    
    // Retorna o texto gerado ou uma mensagem padrão caso venha vazio
    return response.text || "Mantenha o equilíbrio. Estou analisando seus dados para insights futuros!";
  } catch (error: any) {
    // Tratamento específico para erro de Cota (429)
    if (error.status === 429 || error.code === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      console.warn("Ghz AI: Cota de requisições excedida (429). Retornando fallback.");
      return "A IA está descansando um pouco (Cota excedida). Continue focado nas suas metas diárias!";
    }

    console.error("Erro no serviço Ghz AI:", error);
    // Fallback gracioso para outros erros
    return "Concentre-se no hoje! Beba água, revise suas metas e mantenha o controle financeiro.";
  }
};