import { z } from "zod"

export const CreateTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  type: z.enum(["Bug", "Enhancement", "Feature", "Testing", "Development", "Design"]),
  description: z.string().optional(),
  status: z
    .enum(["Backlog", "To Do", "In Progress", "Ready for Review", "Back for Review", "Completed"])
    .default("Backlog"),
  isActive: z.boolean().default(true),
})

export const UpdateTaskSchema = CreateTaskSchema.merge(
  z.object({
    id: z.string(),
  })
)

export const DeleteTaskSchema = z.object({
  id: z.string(),
})
