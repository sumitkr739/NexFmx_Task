import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getTask from "../../queries/getTask"
import { EditTask } from "../../components/EditTask"

type EditTaskPageProps = {
  params: { taskId: string }
}

export async function generateMetadata({ params }: EditTaskPageProps): Promise<Metadata> {
  const Task = await invoke(getTask, { id: String(params.taskId) })
  return {
    title: `Edit Task ${Task.id} - ${Task.name}`,
  }
}

export default async function Page({ params }: EditTaskPageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTask taskId={params.taskId} />
      </Suspense>
    </div>
  )
}
