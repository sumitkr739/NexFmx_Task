import React, { Suspense } from "react"
import { Form, FormProps } from "src/app/components/Form"
import { LabeledTextField } from "src/app/components/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "src/app/components/Form"

export function TaskForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Enter Task Name" type="text" />
      <LabeledTextField name="type" label="Type" placeholder="Enter Task Type" type="text" />
      <LabeledTextField
        name="description"
        label="Description"
        placeholder="Enter Task description"
        type="text"
      />
      {/* template: <_component_ name="_fieldName" label="Field_Name" placeholder="Field_Name"  type="inputType_" /> */}
    </Form>
  )
}
