"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteTask from "../mutations/deleteTask"
import getTask from "../queries/getTask"

export const Task = ({ taskId }: { taskId: string }) => {
  const router = useRouter()
  const [deleteTaskMutation] = useMutation(deleteTask)
  const [task] = useQuery(getTask, { id: taskId })

  return (
    <>
      <div>
        <h1>Project {task.id}</h1>
        <pre>{JSON.stringify(task, null, 2)}</pre>

        <Link href={`/tasks/${task.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTaskMutation({ id: task.id })
              router.push("/tasks")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
