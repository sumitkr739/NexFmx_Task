import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "formik"

export interface LabeledCheckboxProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Checkbox label. */
  label: string
}

export const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxProps>(
  ({ name, label, ...props }, ref) => {
    const [field, meta] = useField(name)

    return (
      <div className="flex items-center mt-2">
        <input type="checkbox" {...field} {...props} ref={ref} />
        <label className="ml-2">{label}</label>
        {meta.touched && meta.error && (
          <div role="alert" style={{ color: "red" }}>
            {meta.error}
          </div>
        )}
      </div>
    )
  }
)

LabeledCheckbox.displayName = "LabeledCheckbox"

export default LabeledCheckbox
