import { Task, TaskPriority, TaskType } from "../../domain/tasks.types";

/**
 * @author HallTech AI
 * Dados iniciais para o módulo de tarefas.
 */
export const tasksMocks: Task[] = [
  {
    id: "1",
    title: "Estudar React Native",
    completed: false,
    priority: TaskPriority.HIGH,
    type: TaskType.DAILY,
    content: "Revisar hooks e navegação",
  },
  {
    id: "2",
    title: "Ir na Academia",
    completed: true,
    priority: TaskPriority.MEDIUM,
    type: TaskType.DAILY,
    content: "Treino de pernas e cardio",
  },
  {
    id: "3",
    title: "Organizar Desk",
    completed: false,
    priority: TaskPriority.LOW,
    type: TaskType.DAILY,
    content: "Limpar poeira e organizar cabos",
  },
  // Goals
  {
    id: "4",
    title: "Viagem para Europa",
    completed: false,
    priority: TaskPriority.HIGH,
    type: TaskType.DREAM,
    progress: 35,
    targetValue: 15000,
    currentValue: 5250,
    dueDate: "2025-12-01",
    content: "Economizar para a viagem dos sonhos",
  },
  {
    id: "5",
    title: "Ler 12 Livros",
    completed: false,
    priority: TaskPriority.MEDIUM,
    type: TaskType.GOAL,
    progress: 50,
    targetValue: 12,
    currentValue: 6,
    content: "Aprimorar conhecimentos e habilidades",
  },
  // Shopping
  {
    id: "6",
    title: "Fone de Ouvido Novo",
    completed: false,
    priority: TaskPriority.LOW,
    type: TaskType.SHOPPING,
    estimatedCost: 350,
    content: "Procurar por modelos com cancelamento de ruído",
  },
  {
    id: "7",
    title: "Monitor 4k",
    completed: true,
    priority: TaskPriority.HIGH,
    type: TaskType.SHOPPING,
    estimatedCost: 2000,
    content: "Comprar monitor para melhorar produtividade",
  },
  // Notes
  {
    id: "8",
    title: "Ideias para Blog",
    completed: false,
    priority: TaskPriority.LOW,
    type: TaskType.NOTE,
    content: "Escrever sobre desenvolvimento web e dicas de produtividade",
  },
  {
    id: "9",
    title: "Receita de Panqueca",
    completed: false,
    priority: TaskPriority.LOW,
    type: TaskType.NOTE,
    content:
      "Misturar 1 xícara de farinha, 1 ovo, 1 xícara de leite e uma pitada de sal. Cozinhar em fogo médio até dourar dos dois lados.",
  },
];