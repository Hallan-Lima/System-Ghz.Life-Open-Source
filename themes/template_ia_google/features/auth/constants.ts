import { Interest, OnboardingSlide, SystemModule } from "./auth.types";

/**
 * @author HallTech AI
 * Slides do onboarding exibidos na tela de Login.
 */
export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    category: "Academia",
    title: "Viva",
    description: "Transforme sua rotina com monitoramento inteligente de treinos e saúde.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    category: "Financeiro",
    title: "Domine",
    description: "Controle gastos, acompanhe investimentos e alcance suas metas financeiras.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    category: "Saude",
    title: "Bem-estar",
    description: "Lembretes de hidratação, sono e medicação integrados.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-indigo-600 to-purple-600",
  },
  {
    id: 4,
    category: "Agenda",
    title: "Organize",
    description: "Lembretes de tarefas, compromissos e metas.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-indigo-600 to-purple-600",
  },
  {
    id: 5,
    category: "Social",
    title: "Conecte-se",
    description: "Mantenha-se em contato com amigos e familiares.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-rose-600 to-pink-600",
  },
  {
    id: 6,
    category: "Alimentação",
    title: "Nutrição",
    description: "Planeje refeições balanceadas e acompanhe sua dieta.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
    accentColor: "from-emerald-600 to-teal-600",
  },
];

export const ONBOARDING_CATEGORIES = [
  "Academia",
  "Financeiro",
  "Saude",
  "Agenda",
  "Social",
  "Alimentação",
];

/**
 * @author HallTech AI
 * Módulos disponíveis para seleção no registro.
 */
export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: "finance",
    title: "Financeiro",
    icon: "fas fa-wallet",
    color: "text-emerald-500",
    desc: "Controle gastos e metas.",
  },
  {
    id: "health",
    title: "Saúde",
    icon: "fas fa-heartbeat",
    color: "text-rose-500",
    desc: "Monitore água, sono e treino.",
  },
  {
    id: "productivity",
    title: "Produtividade",
    icon: "fas fa-list-check",
    color: "text-indigo-500",
    desc: "Tarefas e agenda inteligente.",
  },
];

/**
 * @author HallTech AI
 * Lista de interesses mapeados para módulos ou características do usuário.
 */
export const INTERESTS_LIST: Interest[] = [
  // --- MÓDULOS (Funcionalidades do Sistema) ---
  // Módulo: Financeiro
  { id: "contas_pagar", label: "Contas a Pagar", category: "module", relatedModule: "finance" },
  { id: "contas_receber", label: "Contas a Receber", category: "module", relatedModule: "finance" },
  { id: "controle_movimentacoes", label: "Controle de Movimentações", category: "module", relatedModule: "finance" },
  { id: "objetivo_financeiro", label: "Objetivo Financeiro", category: "module", relatedModule: "finance" },
  { id: "cartao_credito", label: "Cartão de Crédito", category: "module", relatedModule: "finance" },
  { id: "importacao_movimentacoes", label: "Importação de Movimentações", category: "module", relatedModule: "finance" },
  { id: "integracao_bancos", label: "Integração com Bancos", category: "module", relatedModule: "finance" },
  { id: "planejamento_orcamento", label: "Planejamento e Orçamento", category: "module", relatedModule: "finance" },
  { id: "lista_compra", label: "Lista de Compra", category: "module", relatedModule: "finance" },
  { id: "calculadora_basica", label: "Calculadora Básica", category: "module", relatedModule: "finance" },
  { id: "calculadora_cientifica", label: "Calculadora Científica", category: "module", relatedModule: "finance" },
  { id: "calculadora_financeira", label: "Calculadora Financeira", category: "module", relatedModule: "finance" },
  { id: "calculadora_conversoes", label: "Calculadora de Conversões", category: "module", relatedModule: "finance" },

  // Módulo: Saúde
  { id: "lembrete_agua", label: "Lembrete de Beber Água", category: "module", relatedModule: "health" },
  { id: "lembrete_medicamento", label: "Lembrete Médico", category: "module", relatedModule: "health" },
  { id: "acompanhamento_medico", label: "Acompanhamento Médico", category: "module", relatedModule: "health" },
  { id: "ciclo_menstrual", label: "Ciclo Menstrual", category: "module", relatedModule: "health" },
  { id: "monitoramento_peso", label: "Monitoramento de Peso", category: "module", relatedModule: "health" },
  { id: "monitoramento_sono", label: "Monitoramento de Sono", category: "module", relatedModule: "health" },
  { id: "monitoramento_cardiaco", label: "Monitoramento Cardíaco", category: "module", relatedModule: "health" },
  { id: "monitoramento_pressao", label: "Monitoramento de Pressão", category: "module", relatedModule: "health" },
  { id: "monitoramento_temperatura", label: "Monitoramento de Temperatura", category: "module", relatedModule: "health" },
  { id: "dispositivos_inteligentes", label: "Dispositivos Inteligentes", category: "module", relatedModule: "health" },

  // Módulo: Produtividade & Agenda
  { id: "agenda", label: "Agenda", category: "module", relatedModule: "productivity" },
  { id: "eventos", label: "Eventos", category: "module", relatedModule: "productivity" },
  { id: "tarefas", label: "Tarefas", category: "module", relatedModule: "productivity" },
  { id: "lembretes", label: "Lembretes", category: "module", relatedModule: "productivity" },
  { id: "despertador", label: "Despertador", category: "module", relatedModule: "productivity" },
  { id: "metas_pessoais", label: "Metas Pessoais", category: "module", relatedModule: "productivity" },
  { id: "cronometro", label: "Cronômetro", category: "module", relatedModule: "productivity" },
  { id: "pomodoro", label: "Pomodoro", category: "module", relatedModule: "productivity" },

  // Módulo: Alimentação
  { id: "alimentacao", label: "Alimentação", category: "module", relatedModule: "health" },
  { id: "plano_alimentar", label: "Plano Alimentar", category: "module", relatedModule: "health" },
  { id: "controle_nutrientes", label: "Controle de Nutrientes", category: "module", relatedModule: "health" },
  { id: "personal_trainer", label: "Personal Trainer", category: "module", relatedModule: "health" },

  // Módulo: Esportes & Fitness
  { id: "atividades_fisicas", label: "Atividades Físicas", category: "module", relatedModule: "health" },
  { id: "montar_treinos", label: "Montar Treinos", category: "module", relatedModule: "health" },
  { id: "acompanhar_academia", label: "Acompanhar Academia", category: "module", relatedModule: "health" },
  { id: "acompanhar_progresso", label: "Acompanhar Progresso", category: "module", relatedModule: "health" },

  // Módulo: Social
  { id: "rede_social", label: "Rede Social", category: "module", relatedModule: "social" },
  { id: "criacao_enquetes", label: "Criação de Enquetes", category: "module", relatedModule: "social" },
  { id: "encontrar_servicos", label: "Encontrar Serviços", category: "module", relatedModule: "social" },
  { id: "prestar_servicos", label: "Prestar Serviços", category: "module", relatedModule: "social" },
  { id: "encontrar_pessoas", label: "Encontrar Pessoas", category: "module", relatedModule: "social" },
  { id: "participar_comunidades", label: "Participar de Comunidades", category: "module", relatedModule: "social" },
  { id: "chat_aleatorio", label: "Chat Aleatório", category: "module", relatedModule: "social" },
  { id: "noticias", label: "Notícias", category: "module", relatedModule: "social" },

  // Módulo: Agente IA
  { id: "conta_conjunta", label: "Conta Conjunta", category: "module", relatedModule: "ai_agent" },
  { id: "dicas_personalizadas", label: "Dicas Personalizadas", category: "module", relatedModule: "ai_agent" },

  // --- CARACTERÍSTICAS DO USUÁRIO (Personalização do Agente) ---
  // Interesses Gerais
  { id: "tecnologia", label: "Tecnologia", category: "user_trait" },
  { id: "leitura", label: "Leitura", category: "user_trait" },
  { id: "viagens", label: "Viagens", category: "user_trait" },
  { id: "culinaria", label: "Culinária", category: "user_trait" },
  { id: "meditacao", label: "Meditação", category: "user_trait" },
  { id: "artes", label: "Artes", category: "user_trait" },
  { id: "hobbies", label: "Hobbies", category: "user_trait" },

  // Estilos de Vida & Saúde
  { id: "estilo_vida_saudavel", label: "Estilo de Vida Saudável", category: "user_trait" },
  { id: "musculacao", label: "Musculação", category: "user_trait" },
  { id: "yoga", label: "Yoga", category: "user_trait" },
  { id: "esportes", label: "Esportes", category: "user_trait" },

  // Entretenimento & Mídia
  { id: "games", label: "Games", category: "user_trait" },
  { id: "musica", label: "Música", category: "user_trait" },
  { id: "filmes", label: "Filmes", category: "user_trait" },
  { id: "series", label: "Séries", category: "user_trait" },
  { id: "animes", label: "Animes", category: "user_trait" },
  { id: "livros", label: "Livros", category: "user_trait" },
  { id: "jogos", label: "Jogos", category: "user_trait" },

  // Gêneros Musicais
  { id: "rock", label: "Rock", category: "user_trait" },
  { id: "pop", label: "POP", category: "user_trait" },
  { id: "eletronica", label: "Eletrônica", category: "user_trait" },

  // Gêneros de Conteúdo
  { id: "comedia", label: "Comédia", category: "user_trait" },
  { id: "terror", label: "Terror", category: "user_trait" },
  { id: "drama", label: "Drama", category: "user_trait" },

  // Valores & Características Pessoais
  { id: "valores_crencas", label: "Valores e Crenças", category: "user_trait" },
  { id: "experiencias", label: "Experiências", category: "user_trait" },
  { id: "cultura_ambiente", label: "Cultura e Ambiente", category: "user_trait" },
  { id: "habilidades_talentos", label: "Habilidades e Talentos", category: "user_trait" },
  { id: "investimentos", label: "Investimentos", category: "user_trait" },
  { id: "estudos", label: "Estudos", category: "user_trait" },
];

export const getModuleInterests = () => 
  INTERESTS_LIST.filter(interest => interest.category === "module");

export const getUserTraitInterests = () => 
  INTERESTS_LIST.filter(interest => interest.category === "user_trait");
