import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getTask from "../queries/getTask"
import { Task } from "../components/Task"

export async function generateMetadata({ params }: TaskPageProps): Promise<Metadata> {
  const Task = await invoke(getTask, { id: Number(params.taskId) })
  return {
    title: `Task ${Task.id} - ${Task.name}`,
  }
}

type TaskPageProps = {
  params: { taskId: string }
}

export default async function Page({ params }: TaskPageProps) {
  return (
    <div>
      <p>
        <Link href={"/tasks"}>Tasks</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Task taskId={Number(params.taskId)} />
      </Suspense>
    </div>
  )
}
