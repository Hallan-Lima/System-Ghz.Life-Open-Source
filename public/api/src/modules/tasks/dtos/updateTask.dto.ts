/**
 * @author HallTech AI
 */
import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1, "O campo 'title' é obrigatório.").optional(),
  type: z.enum(["DAILY", "GOAL", "DREAM", "SHOPPING", "NOTE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.string().datetime().nullable().optional(),
  content: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  targetValue: z.number().nullable().optional(),
  currentValue: z.number().nullable().optional(),
  estimatedCost: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  recurrence: z.string().nullable().optional(),
  isPinned: z.boolean().optional()
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
