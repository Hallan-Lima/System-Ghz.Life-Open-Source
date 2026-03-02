import { AppModule } from "./modules.types";

/**
 * @author HallTech AI
 * Configuração padrão dos módulos do sistema.
 */
export const defaultModules: AppModule[] = [
  {
    id: "productivity",
    title: "Produtividade",
    icon: "fas fa-list-check",
    color: "indigo",
    description: "Gestão de tarefas, metas e organização pessoal.",
    isEnabled: true,
    features: [
      { 
        id: "daily_tasks", 
        label: "Tarefas Diárias", 
        description: "Checklists de rotina", 
        isEnabled: true,
        quickAccessIcon: "fas fa-check-double",
        route: "/tasks?type=DAILY"
      },
      { 
        id: "goals", 
        label: "Metas & Objetivos", 
        description: "Metas quantitativas", 
        isEnabled: true,
        quickAccessIcon: "fas fa-bullseye",
        route: "/tasks?type=GOAL"
      },
      { 
        id: "dreams", 
        label: "Sonhos", 
        description: "Visão de longo prazo", 
        isEnabled: true,
        quickAccessIcon: "fas fa-plane",
        route: "/tasks?type=DREAM"
      },
      { 
        id: "shopping", 
        label: "Listas de Compras", 
        description: "Controle de itens e valores", 
        isEnabled: true,
        quickAccessIcon: "fas fa-cart-shopping",
        route: "/tasks?type=SHOPPING"
      },
      { 
        id: "notes", 
        label: "Anotações", 
        description: "Bloco de notas rápido", 
        isEnabled: true,
        quickAccessIcon: "fas fa-sticky-note",
        route: "/tasks?type=NOTE"
      },
    ]
  },
  {
    id: "finance",
    title: "Financeiro",
    icon: "fas fa-wallet",
    color: "emerald",
    description: "Controle de gastos, entradas e planejamento.",
    isEnabled: true,
    features: [
      { 
        id: "transactions", 
        label: "Movimentações", 
        description: "Registro de entradas/saídas", 
        isEnabled: true,
        quickAccessIcon: "fas fa-money-bill-wave",
        route: "/finance"
      },
      { id: "categories", label: "Categorias", description: "Agrupamento de gastos", isEnabled: true },
      { id: "credit_cards", label: "Cartões de Crédito", description: "Gestão de faturas", isEnabled: false },
      { id: "reports", label: "Relatórios", description: "Gráficos mensais", isEnabled: true },
    ]
  },
  {
    id: "health",
    title: "Saúde & Bem-estar",
    icon: "fas fa-heartbeat",
    color: "rose",
    description: "Monitoramento corporal e hábitos saudáveis.",
    isEnabled: true,
    features: [
      { 
        id: "water", 
        label: "Hidratação", 
        description: "Meta de água diária", 
        isEnabled: true,
        quickAccessIcon: "fas fa-glass-water",
        route: "/health"
      },
      { 
        id: "medicines", 
        label: "Medicamentos", 
        description: "Lembretes de hora em hora", 
        isEnabled: true,
        quickAccessIcon: "fas fa-pills",
        route: "/health"
      },
      { 
        id: "appointments", 
        label: "Consultas", 
        description: "Agenda médica", 
        isEnabled: true,
        quickAccessIcon: "fas fa-user-doctor",
        route: "/health"
      },
      { id: "workout", label: "Treinos", description: "Ficha de academia", isEnabled: false },
    ]
  },
  {
    id: "ai_assistant",
    title: "Inteligência Artificial",
    icon: "fas fa-brain",
    color: "purple",
    description: "Assistente virtual e insights inteligentes.",
    isEnabled: true,
    features: [
      { 
        id: "chat", 
        label: "Sugestões IA", 
        description: "Conversa e Dicas", 
        isEnabled: true,
        quickAccessIcon: "fas fa-heart-pulse",
        route: "/ia"
      },
    ]
  },
  {
    id: "social",
    title: "Social",
    icon: "fas fa-users",
    color: "amber",
    description: "Interações, eventos e comunidades.",
    isEnabled: false,
    features: [
      { 
        id: "events", 
        label: "Agenda Social", 
        description: "Calendário social", 
        isEnabled: true,
        quickAccessIcon: "far fa-calendar-alt",
        route: "/social" 
      },
      { 
        id: "explore", 
        label: "Explorar", 
        description: "Descobrir novidades", 
        isEnabled: true,
        quickAccessIcon: "far fa-compass",
        route: "/social" 
      },
    ]
  }
];
