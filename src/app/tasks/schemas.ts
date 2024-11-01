import { z } from "zod"

export const CreateTaskSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateTaskSchema = CreateTaskSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTaskSchema = z.object({
  id: z.number(),
})
