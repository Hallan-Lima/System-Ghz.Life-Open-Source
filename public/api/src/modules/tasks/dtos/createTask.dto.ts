/**
 * @author HallTech AI
 */
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "O campo 'title' é obrigatório."),
  type: z.enum(["DAILY", "GOAL", "DREAM", "SHOPPING", "NOTE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  dueDate: z.string().datetime().nullable().optional(),
  content: z.string().nullable().optional(),
  tags: z.array(z.string()).optional().default([]),
  targetValue: z.number().nullable().optional(),
  currentValue: z.number().nullable().optional(),
  estimatedCost: z.number().nullable().optional(),
  unit: z.string().nullable().optional().default("un"),
  recurrence: z.string().nullable().optional()
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
