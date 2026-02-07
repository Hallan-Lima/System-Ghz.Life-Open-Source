/**
 * @author HallTech AI
 */
import { z } from "zod";

export const updateProgressSchema = z.object({
  value: z.number({ required_error: "O campo 'value' é obrigatório." })
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
