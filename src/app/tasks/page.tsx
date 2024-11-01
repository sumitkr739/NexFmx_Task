import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { TasksList } from "./components/TasksList"

export const metadata: Metadata = {
  title: "Tasks",
  description: "List of tasks",
}

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/tasks/new"}>Create Task</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <TasksList />
      </Suspense>
    </div>
  )
}
