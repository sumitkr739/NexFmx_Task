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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4">Project {task.id}</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(task, null, 2)}
      </pre>

      <div className="mt-6">
        <Link href={`/tasks/${task.id}/edit`} className="text-blue-600 hover:underline">
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTaskMutation({ id: task.id })
              router.push("/tasks")
            }
          }}
          className="ml-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
