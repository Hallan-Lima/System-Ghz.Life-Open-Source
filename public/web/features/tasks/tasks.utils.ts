import { TaskType } from "../../domain/tasks.types";

/**
 * @author HallTech AI
 * Retorna a configuração visual (cor, ícone, label) baseada no tipo da tarefa.
 */
export const getTaskTypeConfig = (t: TaskType) => {
  switch (t) {
    case TaskType.DAILY:
      return {
        label: "Tarefa",
        icon: "fas fa-check",
        color: "indigo",
        desc: "Dia a dia",
      };
    case TaskType.GOAL:
      return {
        label: "Meta",
        icon: "fas fa-bullseye",
        color: "amber",
        desc: "Objetivo",
      };
    case TaskType.DREAM:
      return {
        label: "Sonho",
        icon: "fas fa-plane",
        color: "rose",
        desc: "Longo prazo",
      };
    case TaskType.SHOPPING:
      return {
        label: "Compra",
        icon: "fas fa-cart-shopping",
        color: "emerald",
        desc: "Lista",
      };
    case TaskType.NOTE:
      return {
        label: "Nota",
        icon: "fas fa-sticky-note",
        color: "cyan",
        desc: "Anotação",
      };
    default:
      return {
        label: "Item",
        icon: "fas fa-star",
        color: "slate",
        desc: "Geral",
      };
  }
};

// Helpers para Labels de Metas (Goals)

export const getNecessityLabel = (v: number) => {
  if (v < 20) return "Opcional";
  if (v < 40) return "Desejável";
  if (v < 60) return "Importante";
  if (v < 80) return "Essencial";
  return "Vital / Crítico";
};

export const getSatisfactionLabel = (v: number) => {
  if (v < 20) return "Indiferente";
  if (v < 40) return "Ligeiro";
  if (v < 60) return "Moderado";
  if (v < 80) return "Gratificante";
  return "Transformador";
};

export const getFrequencyLabel = (v: number) => {
  if (v < 20) return "Única / Rara";
  if (v < 40) return "Às vezes";
  if (v < 60) return "Semanal";
  if (v < 80) return "Regular";
  return "Todo dia";
};