import { useState, ReactNode, PropsWithoutRef } from "react"
import { Formik, FormikProps } from "formik"
import { validateZodSchema } from "blitz"
import { z } from "zod"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  register(
    arg0: string
  ): JSX.IntrinsicAttributes &
    import("react").ClassAttributes<HTMLSelectElement> &
    import("react").SelectHTMLAttributes<HTMLSelectElement>
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>["initialValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {formError && (
            <div role="alert" className="text-red-600 font-semibold mt-4">
              {formError}
            </div>
          )}

          {submitText && (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-500 transition duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitText}
            </button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    </Formik>
  )
}

export default Form
