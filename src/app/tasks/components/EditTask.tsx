"use client"
import { Suspense } from "react"
import updateTask from "../mutations/updateTask"
import getTask from "../queries/getTask"
import { UpdateTaskSchema } from "../schemas"
import { FORM_ERROR, TaskForm } from "./TaskForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditTask = ({ taskId }: { taskId: number }) => {
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
    <>
      <div>
        <h1>Edit Task {task.id}</h1>
        <pre>{JSON.stringify(task, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
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
                router.refresh()
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
    </>
  )
}
