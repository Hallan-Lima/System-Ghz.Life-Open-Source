import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TaskType, TaskPriority, RecurrenceInterval } from "../../../domain/tasks.types";
import { tasksService } from "../services/tasks.service";

/**
 * @author HallTech AI
 * Hook responsável pela lógica de criação de tarefas.
 */
export const useTaskCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultType = location.state?.defaultType || TaskType.DAILY;

  // Estados Básicos
  const [type, setType] = useState<TaskType>(defaultType);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  
  // Estados de Detalhes
  const [dueDate, setDueDate] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [cost, setCost] = useState("");
  const [unit, setUnit] = useState("un");
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
    const taskData = {
      title,
      type,
      priority: type === TaskType.NOTE ? TaskPriority.LOW : priority,
      dueDate,
      targetValue: Number(targetValue),
      cost: Number(cost),
      unit,
      recurrence,
      notes,
      tags,
      createdAt: new Date(),
      // Mapeamento dos campos de meta
      metaConfig: type === TaskType.GOAL ? { necessity, satisfaction, frequency } : undefined
    };

    await tasksService.createTask(taskData);
    navigate(-1);
  };

  const handleBack = () => navigate(-1);

  return {
    form: {
      type, setType,
      title, setTitle,
      priority, setPriority,
      dueDate, setDueDate,
      targetValue, setTargetValue,
      cost, setCost,
      unit, setUnit,
      recurrence, setRecurrence,
      notes, setNotes,
      tags, tagInput, setTagInput,
      necessity, setNecessity,
      satisfaction, setSatisfaction,
      frequency, setFrequency,
      priorityMode, setPriorityMode
    },
    actions: {
      handleAddTag,
      removeTag,
      handleSave,
      handleBack
    }
  };
};