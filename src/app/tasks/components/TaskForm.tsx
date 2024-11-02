import React from "react"
import { Form, FormProps } from "src/app/components/Form"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { LabeledSelect } from "src/app/components/LabeledSelect" // Ensure this component exists
import { z } from "zod"
import LabeledCheckbox from "src/app/components/LabeledCheckbox"
export { FORM_ERROR } from "src/app/components/Form"

// Updated task types
const taskTypes = [
  { value: "Bug", label: "Bug" },
  { value: "Enhancement", label: "Enhancement" },
  { value: "Feature", label: "Feature" },
  { value: "Testing", label: "Testing" },
  { value: "Development", label: "Development" },
  { value: "Design", label: "Design" },
]

// Updated status options
const statusOptions = [
  { value: "Backlog", label: "Backlog" },
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Ready for Review", label: "Ready for Review" },
  { value: "Back for Review", label: "Back for Review" },
  { value: "Completed", label: "Completed" },
]

export function TaskForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Enter Task Name" type="text" />
      <LabeledSelect name="type" label="Type" options={taskTypes} />
      <LabeledTextField
        name="description"
        label="Description"
        placeholder="Enter Task description"
        type="text"
      />
      <LabeledSelect name="status" label="Status" options={statusOptions} />
      <LabeledCheckbox name="isActive" label="Is Active" defaultChecked={true} />
    </Form>
  )
}
