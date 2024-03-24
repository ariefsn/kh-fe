import { z } from "zod"

export const SchemaLoginDto = z.object({
  username: z.string().min(6),
  password: z.string().min(6)
})

export type ILoginDto = z.infer<typeof SchemaLoginDto>