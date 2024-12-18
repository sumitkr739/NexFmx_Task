"use client"

import { usePaginatedQuery, invalidateQuery, useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import getTasks from "../queries/getTasks" // Adjust path as necessary
import deleteTask from "../mutations/deleteTask" // Import delete mutation
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa"

const ITEMS_PER_PAGE = 15

export const TasksList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [{ tasks }, { refetch }] = usePaginatedQuery(getTasks, {
    orderBy: { id: "asc" },
    take: ITEMS_PER_PAGE,
    skip: currentPage * ITEMS_PER_PAGE,
  })

  const router = useRouter()
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [deleteTaskMutation] = useMutation(deleteTask) // Initialize the delete mutation

  const handleEdit = (taskId: string) => {
    router.push(`/tasks/${taskId}/edit`)
  }

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTaskMutation({ id: taskId }) // Call delete mutation with task ID
      await invalidateQuery(getTasks) // Refetch tasks after deletion
    } catch (error) {
      console.error("Failed to delete task", error)
    }
    setTaskToDelete(null)
  }

  const handleCreateTask = async () => {
    router.push("/tasks/new")
    await invalidateQuery(getTasks)
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || task.status === statusFilter)
  )

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)

  return (
    <div className="w-full overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-md">
      {/* Task List Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task List</h2>

      {/* Filters Row */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-2 bg-white w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Quick Search"
            className="p-2 w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none w-1/4"
        >
          <option value="">Task Status</option>
          <option value="Backlog">Backlog</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Ready for Review">Ready for Review</option>
          <option value="Back for Review">Back for Review</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={handleCreateTask}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition duration-200"
        >
          <FaPlus className="mr-2" />
          New Task
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No tasks available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 font-semibold">
              <th className="py-2 px-4 border-b">Actions</th>
              <th className="py-2 px-4 border-b">Task Type</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Is Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks
              .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
              .map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === task.id ? null : task.id)}
                      className="text-black py-1 px-3 rounded-md hover:bg-gray-400 transition duration-200"
                    >
                      ...
                    </button>
                    {dropdownOpen === task.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md border z-10">
                        <button
                          onClick={() => handleEdit(task.id)}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <FaTrash className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{task.type}</td>
                  <td className="py-2 px-4 border-b">{task.name}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">{task.isActive ? "true" : "false"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 0 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
          disabled={currentPage >= totalPages - 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage >= totalPages - 1
              ? "bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
