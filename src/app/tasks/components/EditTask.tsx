"use client"
import { Suspense } from "react"
import updateTask from "../mutations/updateTask"
import getTask from "../queries/getTask"
import { UpdateTaskSchema } from "../schemas"
import { FORM_ERROR, TaskForm } from "./TaskForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditTask = ({ taskId }: { taskId: string }) => {
  const [task, { setQueryData }] = useQuery(
    getTask,
    { id: taskId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTaskMutation] = useMutation(updateTask)
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Task {task.id}</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto mb-4">
        {JSON.stringify(task, null, 2)}
      </pre>
      <Suspense fallback={<div className="text-center text-gray-500">Loading form...</div>}>
        <TaskForm
          submitText="Update Task"
          schema={UpdateTaskSchema}
          initialValues={task}
          onSubmit={async (values) => {
            try {
              const updated = await updateTaskMutation({
                ...values,
                id: task.id,
              })
              await setQueryData(updated)
              router.push(`/tasks`)
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
    </div>
  )
}
