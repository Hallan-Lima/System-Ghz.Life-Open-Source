import { GoogleGenAI } from "@google/genai";
import { financeService } from "@/modules/finance/features/services/finance.service";
import { tasksService } from "@/modules/tasks/features/services/tasks.service";
import { healthService } from "@/modules/health/features/services/health.service";
import { settingsService } from "@/modules/settings/features/services/settings.service";
import { ChatMessage } from "../ai.types";
import config from "@/src/config";

/**
 * @author HallTech AI
 * Serviço de Chatbot com Contexto Ampliado.
 * Responsável por cruzar dados do usuário e enviar para o Gemini.
 */
class AiService {
  private client: any = null; // Alterado para aceitar null

  constructor() {
    // Só tenta inicializar o cliente se a chave existir e não for a string padrão
    if (config.geminiApiKey && config.geminiApiKey !== 'SUA_CHAVE_LOCAL_AQUI') {
      try {
        this.client = new GoogleGenAI({ apiKey: config.geminiApiKey });
      } catch (error) {
        console.warn("Ghz AI: Falha ao inicializar o Gemini", error);
      }
    } else {
      console.warn("Ghz AI: Chave de API não configurada. IA desativada.");
    }
  }

  /**
   * Helper para delay (sleep)
   */
  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Coleta todos os dados do usuário dos outros serviços para criar o contexto.
   */
  private async gatherUserContext(): Promise<string> {
    try {
      const [finance, tasks, health, user] = await Promise.all([
        financeService.getFinanceData(),
        tasksService.getTasks(),
        healthService.getHealthData(),
        settingsService.getUserProfile()
      ]);

      // Filtra tarefas pendentes e importantes
      const importantTasks = tasks
        .filter(t => !t.completed)
        .map(t => `- ${t.title} (Prioridade: ${t.priority}, Tipo: ${t.type})`)
        .join('\n');

      // Resumo financeiro
      const financeContext = `Saldo/Reserva: R$ ${finance.summary.reserve}. Entradas: R$ ${finance.summary.income}. Saídas: R$ ${finance.summary.expense}.`;

      // Resumo saúde
      const healthContext = `Água hoje: ${health.water.current}ml / ${health.water.goal}ml.`;

      return `
        DADOS DO USUÁRIO (Contexto Real):
        Nome: ${user.name}
        
        1. FINANÇAS:
        ${financeContext}
        
        2. TAREFAS PENDENTES:
        ${importantTasks || "Nenhuma tarefa pendente."}
        
        3. SAÚDE:
        ${healthContext}
      `;
    } catch (error) {
      console.warn("Erro ao coletar contexto para IA", error);
      return "Dados do usuário indisponíveis no momento.";
    }
  }

  /**
   * Envia uma mensagem para o Gemini, injetando o contexto do sistema.
   */
  async sendMessage(userMessage: string, history: ChatMessage[]): Promise<string> {
    try {
      // 1. Coleta o contexto atualizado (Real-time RAG simples)
      const contextData = await this.gatherUserContext();

      // 2. Prepara o System Instruction
      const systemInstruction = `
        Você é o assistente pessoal inteligente do app "Ghz.Life".
        Seu objetivo é ajudar o usuário a equilibrar Finanças, Saúde e Produtividade.
        
        ${contextData}
        
        DIRETRIZES:
        - Seja conciso, amigável e direto.
        - Use os dados fornecidos acima para personalizar a resposta.
        - Se o usuário perguntar "posso gastar?", verifique o financeiro.
        - Se o usuário parecer estressado, verifique as tarefas e sugira pausas ou água.
        - Responda sempre em Português do Brasil.
        - Use emojis moderadamente.
        - Não invente dados que não estão no contexto.
      `;

      // 3. Inicializa ou recupera o chat (Stateless por request para garantir contexto fresco)
      const chat = this.client.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
        },
        history: history
          .filter(h => h.id !== 'welcome-msg') // Remove msg local inicial se houver duplicidade
          .map(h => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          }))
      });

      // 4. Envia a mensagem com Retry Logic (Exponential Backoff)
      const maxRetries = 3;
      let currentAttempt = 0;

      while (true) {
        try {
          const result = await chat.sendMessage({ message: userMessage });
          return result.text || "Desculpe, não consegui processar sua resposta agora.";
        } catch (error: any) {
          currentAttempt++;
          const errorCode = error.status || error.code || error.error?.code || error.error?.status;

          // Verifica se é erro de cota (429) ou serviço indisponível (503)
          // 429: Too Many Requests / Resource Exhausted
          // 503: Service Unavailable
          const isRetryable = errorCode === 429 || errorCode === 503;

          if (isRetryable && currentAttempt <= maxRetries) {
            // Backoff: 2s, 4s, 8s... (Aumentado para garantir recuperação em picos)
            const delay = Math.pow(2, currentAttempt) * 1000;
            console.warn(`Ghz AI: Erro ${errorCode}. Retentando em ${delay}ms... (Tentativa ${currentAttempt}/${maxRetries})`);
            await this.sleep(delay);
            continue;
          }

          throw error; // Lança para o catch externo se não for retryable ou esgotou tentativas
        }
      }

    } catch (error: any) {
      // Verificação robusta para erro de cota (429) em diferentes formatos de resposta
      const errorCode = error.status || error.code || error.error?.code || error.error?.status;
      const errorMessage = error.message || error.error?.message || '';

      const isQuotaError =
        errorCode === 429 ||
        errorCode === 'RESOURCE_EXHAUSTED' ||
        errorMessage.includes('429') ||
        errorMessage.includes('quota') ||
        errorMessage.includes('RESOURCE_EXHAUSTED');

      if (isQuotaError) {
        // Loga como warning para não poluir o console de erros do navegador/monitoramento
        console.warn("Ghz AI: Cota excedida (429). Retornando mensagem amigável ao usuário.");
        return "😴 Minha capacidade de processamento gratuito excedeu por hoje (Erro 429). A IA precisa descansar um pouco. Tente novamente mais tarde.";
      }

      console.error("Erro na API Gemini (Detalhado):", JSON.stringify(error, null, 2));
      return "Estou tendo dificuldades para conectar aos servidores da IA no momento. Por favor, tente novamente em alguns instantes.";
    }
  }
}

export const aiService = new AiService();

export async function getGhzAssistantInsights(transactions: any, tasks: any, health: any): Promise<string> {
  try {
    return await aiService.sendMessage("Analise meu estado geral hoje (finanças, tarefas e saúde) e me dê uma breve recomendação prática em 1 parágrafo curto.", []);
  } catch (error) {
    return "Mantenha o foco em suas tarefas prioritárias e beba água regularmente.";
  }
}