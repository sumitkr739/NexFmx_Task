import { Metadata } from "next"
import { Suspense } from "react"
import { New__ModelName } from "../components/NewTask"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Project</h1>
      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
        <New__ModelName />
      </Suspense>
    </div>
  )
}
