import { z } from "zod"

export const SchemaTodo = z.object({
  id: z.string(),
  name: z.string().min(6),
  details: z.string().min(10),
  done: z.boolean(),
  created_at: z.string()
})

export type ITodo = z.infer<typeof SchemaTodo>

export const SchemaTodoDto = z.object({
  id: z.string().optional(),
  name: z.string().min(6),
  details: z.string().min(10),
  done: z.boolean()
})

export type ITodoDto = z.infer<typeof SchemaTodoDto>