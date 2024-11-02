"use client"

import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import { ForgotPassword } from "../validations"
import forgotPassword from "../mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  const router = useRouter()

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
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center w-full max-w-md p-8 mt-20 bg-white rounded-lg shadow-lg mx-auto">
        <h1 className="text-lg text-blue-600 text-center font-bold mb-6">Forgot your password?</h1>

        {isSuccess ? (
          <div>
            <h2 className="text-center text-green-600">Request Submitted</h2>
            <p className="text-center">
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <Form
            submitText="Send Reset Password Instructions"
            schema={ForgotPassword}
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await forgotPasswordMutation(values)
              } catch (error: any) {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" className="mb-4" />
          </Form>
        )}
      </main>

      <footer className="p-4 text-sm text-gray-600 bg-white shadow-inner text-center mt-auto">
        &copy; {new Date().getFullYear()} Nexfmx. All rights reserved.
      </footer>
    </div>
  )
}
