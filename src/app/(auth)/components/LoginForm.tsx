"use client"

import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import login from "../mutations/login"
import { Login } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import type { Route } from "next"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between w-full p-4 bg-white shadow-lg">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">N</div>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">Nexfmx</h1>
        </div>
        <div className="flex space-x-4">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center w-full max-w-md p-8 mt-20 bg-white rounded-lg shadow-lg mx-auto">
        <h1 className="text-2xl text-blue-600 text-center font-bold mb-6">Login</h1>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              router.refresh()
              if (next) {
                router.push(next as Route)
              } else {
                router.push("/tasks") // Redirect to tasks page instead of home page
              }
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" className="mb-4" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            className="mb-4"
          />
        </Form>

        <div className="mt-4 text-center">
          <Link href={"/forgot-password"} className="text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </main>

      <footer className="p-4 text-sm text-gray-600 bg-white shadow-inner text-center mt-auto">
        &copy; {new Date().getFullYear()} Nexfmx. All rights reserved.
      </footer>
    </div>
  )
}
