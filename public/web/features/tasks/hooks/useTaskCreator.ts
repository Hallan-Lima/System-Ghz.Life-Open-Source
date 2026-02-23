import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Task,
  TaskType,
  TaskPriority,
  RecurrenceInterval,
} from "../../../domain/tasks.types";
import { tasksService } from "../services/tasks.service";
import config from '../../../src/config';
const STORAGE_KEY = config.configStorageKey;

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
    if (!title.trim()) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const userConfig = stored ? JSON.parse(stored) : null;
      const userId = userConfig?.user_id;

      if (!userId) {
        console.warn("useTaskCreator: Usuário não identificado no storage.");
        return;
      }

      const finalTarget = targetValue ? Number(targetValue) : undefined;
      const finalCurrent = currentValue ? Number(currentValue) : undefined;
      const initialProgress = finalTarget && finalCurrent ? Math.round((finalCurrent / finalTarget) * 100) : 0;

      const commonData = {
        user_id: userId,
        type,
        title,
        priority: type === TaskType.NOTE ? TaskPriority.LOW : priority,
        dueDate,
        targetValue: finalTarget,
        currentValue: finalCurrent,
        unit,
        progress: initialProgress,
        completed: finalTarget && finalCurrent ? finalCurrent >= finalTarget : false,
        estimatedCost: cost ? Number(cost) : undefined,
        recurrence: recurrence === "none" ? undefined : recurrence,
        content: notes,
        notes,
        tags,
      };

      if (isEditing && taskToEdit) {
        await tasksService.updateTask({
          ...taskToEdit,
          ...commonData,
        });
      } else {
        await tasksService.createTask({
          ...commonData,
          createdAt: new Date(),
        } as any);
      }

      navigate(-1);
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
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
