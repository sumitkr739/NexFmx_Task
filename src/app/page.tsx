import Link from "next/link"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import getCurrentUser from "./users/queries/getCurrentUser"
import { redirect } from "next/navigation"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)

  if (!currentUser) {
    // Redirect to the login page if user is not authenticated
    redirect("/login") // Replace "/loginform" with the actual route path for your login form
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between w-full p-4 bg-white shadow-lg">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">N</div>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">Nexfmx</h1>
        </div>
        <div className="flex space-x-4">
          {!currentUser ? (
            <>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </header>

      <main className="flex flex-col items-center justify-center w-full max-w-md p-8 mt-20 bg-white rounded-lg shadow-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
          {currentUser
            ? "Welcome Back!"
            : "Your database & authentication is ready. Try it by signing up."}
        </h2>

        <div className="flex flex-col items-center w-full">
          {currentUser ? (
            <div className="mt-4 text-gray-600 text-center">
              User id: <code className="font-mono">{currentUser.id}</code>
              <br />
              User role: <code className="font-mono">{currentUser.role}</code>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="mt-auto p-4 text-sm text-gray-600 bg-white shadow-inner text-center">
        &copy; {new Date().getFullYear()} Nexfmx. All rights reserved.
      </footer>
    </div>
  )
}
