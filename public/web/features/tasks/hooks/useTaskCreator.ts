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
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(location.state?.taskToEdit as Task | undefined);
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
      setPriorityMode(taskToEdit.priorityMode || "manual");
      setNecessity(taskToEdit.necessity ?? 50);
      setSatisfaction(taskToEdit.satisfaction ?? 50);
      setFrequency(taskToEdit.frequency ?? 50);
    }
  }, [taskToEdit]);

  // Actions
  const handleAddTag = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter") return;
    
    if (tagInput.trim()) {
      const newTags = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      const combinedTags = Array.from(new Set([...tags, ...newTags]));
      
      setTags(combinedTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // --- QUICK ACTIONS TOOLBAR ---
  const handleDuplicate = () => {
    setTaskToEdit(undefined); // Remove a referência de edição, transformando em "Modo Criação"
    setTitle((prev) => prev + " (Cópia)"); // Adiciona o sufixo no título
  };

  const handleDelete = async () => {
    if (!taskToEdit?.id) return;
    await tasksService.deleteTask(taskToEdit.id);
    navigate(-1);
  };

  const handleToggleStatus = async () => {
    if (!taskToEdit?.id) return;
    const updated = await tasksService.toggleTaskCompletion(taskToEdit.id);
    setTaskToEdit(updated);
  };

  const handleTogglePin = async () => {
    if (!taskToEdit?.id) return;
    const updated = await tasksService.toggleTaskPin(taskToEdit.id);
    setTaskToEdit(updated);
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

      let finalTags = [...tags];
      if (tagInput.trim()) {
        const pendingTags = tagInput
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== "");
        finalTags = Array.from(new Set([...finalTags, ...pendingTags]));
        
        setTags(finalTags);
        setTagInput("");
      }

      const finalTarget = targetValue ? Number(targetValue) : undefined;
      const finalCurrent = currentValue ? Number(currentValue) : undefined;
      const initialProgress = finalTarget && finalCurrent ? Math.round((finalCurrent / finalTarget) * 100) : 0;

      let finalPriorityScore = 50;
      if (priorityMode === "auto") {
        finalPriorityScore = Math.round((necessity + satisfaction + frequency) / 3);
      } else {
        if (priority === TaskPriority.HIGH) finalPriorityScore = 100;
        else if (priority === TaskPriority.MEDIUM) finalPriorityScore = 50;
        else if (priority === TaskPriority.LOW) finalPriorityScore = 10;
      }

      const commonData = {
        user_id: userId,
        type,
        title,
        priority,
        priorityMode,               // 'manual' ou 'auto'
        priorityScore: finalPriorityScore, // De 0 a 100
        necessity,                  // Valor original do Slider
        satisfaction,               // Valor original do Slider
        frequency,                  // Valor original do Slider
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
        tags: finalTags,
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
      isEditing,
      taskToEdit,
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
      handleDuplicate,
      handleDelete,
      handleToggleStatus,
      handleTogglePin,
    },
  };
};
