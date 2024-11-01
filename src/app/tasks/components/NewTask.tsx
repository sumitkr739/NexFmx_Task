"use client"
import { FORM_ERROR, TaskForm } from "./TaskForm"
import { CreateTaskSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createTask from "../mutations/createTask"
import { useRouter } from "next/navigation"

export function New__ModelName() {
  const [createTaskMutation] = useMutation(createTask)
  const router = useRouter()
  return (
    <TaskForm
      submitText="Create Task"
      schema={CreateTaskSchema}
      onSubmit={async (values) => {
        try {
          const task = await createTaskMutation(values)
          router.push(`/tasks/${task.id}`)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}
