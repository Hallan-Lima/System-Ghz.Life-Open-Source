import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Task,
  TaskType,
  TaskPriority,
  RecurrenceInterval,
} from "../../../domain/tasks.types";
import { tasksService } from "../services/tasks.service";

/**
 * @author HallTech AI
 * Hook responsável pela lógica de criação E edição de tarefas.
 */
export const useTaskCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se estamos em modo de edição via location state
  const taskToEdit = location.state?.taskToEdit as Task | undefined;
  const isEditing = !!taskToEdit;

  const defaultType = location.state?.defaultType || TaskType.DAILY;

  // Estados Básicos
  const [type, setType] = useState<TaskType>(defaultType);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

  // Estados de Detalhes
  const [dueDate, setDueDate] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [cost, setCost] = useState("");
  const [unit, setUnit] = useState("un"); // Padrão 'un'
  const [recurrence, setRecurrence] = useState<RecurrenceInterval>("none");
  const [notes, setNotes] = useState("");

  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Metas Avançadas
  const [necessity, setNecessity] = useState(50);
  const [satisfaction, setSatisfaction] = useState(50);
  const [frequency, setFrequency] = useState(50);
  const [priorityMode, setPriorityMode] = useState<"manual" | "auto">("manual");

  // Carrega dados se for edição
  useEffect(() => {
    if (taskToEdit) {
      setType(taskToEdit.type);
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate || "");
      setTargetValue(taskToEdit.targetValue?.toString() || "");
      setCurrentValue(taskToEdit.currentValue?.toString() || "");
      setCost(taskToEdit.estimatedCost?.toString() || "");
      setUnit(taskToEdit.unit || "un"); // Carrega a unidade salva
      setRecurrence(taskToEdit.recurrence || "none");
      setNotes(taskToEdit.content || taskToEdit.notes || "");
      setTags(taskToEdit.tags || []);
    }
  }, [taskToEdit]);

  // Actions
  const handleAddTag = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter") return;
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async () => {
    // Conversão de valores numéricos
    const finalTarget = targetValue ? Number(targetValue) : undefined;
    const finalCurrent = currentValue ? Number(currentValue) : 0;

    // Calcula progresso inicial se houver meta definida
    let initialProgress = 0;
    if (finalTarget && finalTarget > 0) {
      initialProgress = Math.round((finalCurrent / finalTarget) * 100);
    }

    const commonData = {
      title,
      type,
      priority: type === TaskType.NOTE ? TaskPriority.LOW : priority,
      dueDate,
      targetValue: finalTarget,
      currentValue: finalCurrent,
      unit, // Salva a unidade no objeto
      progress: initialProgress,
      completed: finalTarget ? finalCurrent >= finalTarget : false,
      estimatedCost: cost ? Number(cost) : undefined,
      recurrence,
      content: notes,
      notes,
      tags,
    };

    try {
      if (isEditing && taskToEdit) {
        // UPDATE
        await tasksService.updateTask({
          ...taskToEdit,
          ...commonData,
        });
      } else {
        // CREATE
        await tasksService.createTask({
          ...commonData,
          createdAt: new Date(),
        } as any);
      }

      navigate(-1);
    } catch (error) {
      console.error("Erro ao salvar tarefa", error);
      alert("Erro ao salvar. Tente novamente.");
    }
  };

  const handleBack = () => navigate(-1);

  return {
    isEditing,
    form: {
      type,
      setType,
      title,
      setTitle,
      priority,
      setPriority,
      dueDate,
      setDueDate,
      targetValue,
      setTargetValue,
      currentValue,
      setCurrentValue,
      cost,
      setCost,
      unit,
      setUnit,
      recurrence,
      setRecurrence,
      notes,
      setNotes,
      tags,
      tagInput,
      setTagInput,
      necessity,
      setNecessity,
      satisfaction,
      setSatisfaction,
      frequency,
      setFrequency,
      priorityMode,
      setPriorityMode,
    },
    actions: {
      handleAddTag,
      removeTag,
      handleSave,
      handleBack,
    },
  };
};
