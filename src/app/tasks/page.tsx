import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { TasksList } from "./components/TasksList"
import getCurrentUser from "../users/queries/getCurrentUser"
import { invoke } from "../blitz-server"
import { LogoutButton } from "../(auth)/components/LogoutButton"
import { FaTasks, FaUser, FaCog } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Tasks Management",
  description: "List of tasks",
}

export default async function Page() {
  const currentUser = await invoke(getCurrentUser, null)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg flex flex-col items-center py-8 space-y-6">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">N</div>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">NexFMx</h1>
        </div>
        {currentUser ? (
          <div className="flex flex-col items-center mt-4">
            <div className="h-16 w-16 rounded-full bg-gray-300 mb-2" />
            <h2 className="text-lg font-semibold text-gray-800">{currentUser.name}</h2>
            <p className="text-gray-500 text-sm">{currentUser.role}</p>
          </div>
        ) : (
          <p className="text-gray-600">Not logged in</p>
        )}
        <nav className="mt-8 space-y-4">
          <Link
            href="/tasks"
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <FaTasks className="mr-2" />
            Tasks
          </Link>
          <Link
            href="/profile"
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <FaUser className="mr-2" />
            Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <FaCog className="mr-2" />
            Settings
          </Link>
        </nav>
        <LogoutButton />
      </aside>

      <main className="ml-64 flex-1 p-8">
        <Suspense fallback={<p>Loading...</p>}>
          <TasksList />
        </Suspense>
      </main>
    </div>
  )
}
