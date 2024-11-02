import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"

export interface LabeledSelectProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Options for the select dropdown. */
  options: { value: string; label: string }[]
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledSelect = forwardRef<HTMLSelectElement, LabeledSelectProps>(
  ({ name, label, options, outerProps, ...props }, ref) => {
    const [field, meta] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <label>
          {label}
          <select {...field} disabled={isSubmitting} ref={ref} {...props}>
            <option value="" label="Select an option" />
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <ErrorMessage name={name}>
          {(msg) => (
            <div role="alert" style={{ color: "red" }}>
              {msg}
            </div>
          )}
        </ErrorMessage>

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          select {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

LabeledSelect.displayName = "LabeledSelect"

export default LabeledSelect
