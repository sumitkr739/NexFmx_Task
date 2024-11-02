import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getTask from "../queries/getTask"
import { Task } from "../components/Task"

export async function generateMetadata({ params }: TaskPageProps): Promise<Metadata> {
  const task = await invoke(getTask, { id: String(params.taskId) })
  return {
    title: `Task ${task.id} - ${task.name}`,
  }
}

type TaskPageProps = {
  params: { taskId: string }
}

export default async function Page({ params }: TaskPageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Task Details</h1>
      <p className="text-center mb-4">
        <Link href={"/tasks"} className="text-blue-600 hover:underline">
          Back to Tasks
        </Link>
      </p>
      <Suspense fallback={<div className="text-center text-gray-500">Loading task...</div>}>
        <Task taskId={params.taskId} />
      </Suspense>
    </div>
  )
}
