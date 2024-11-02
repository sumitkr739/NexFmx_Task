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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Task</h2>
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
    </div>
  )
}
