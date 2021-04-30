import { VFC } from 'react'
import { FormControl, FormControlProps } from 'baseui/form-control'
import { Input, InputProps } from 'baseui/input'
import { FastField } from 'formik'

export type InputFieldProps = {
  readonly name: string
  readonly controlOverrides?: FormControlProps['overrides']
  readonly inputOverrides?: InputProps['overrides']
} & Omit<FormControlProps, 'error' | 'children' | 'overrides'> &
  Omit<InputProps, 'overrides'>

export const InputField: VFC<InputFieldProps> = ({
  name,
  label,
  controlOverrides,
  inputOverrides,
  ...props
}) => (
  <FastField name={name}>
    {({ meta: { touched, error }, field }) => (
      <FormControl
        label={label}
        error={touched && error}
        overrides={controlOverrides}
      >
        <Input {...field} {...props} error={touched && error} />
      </FormControl>
    )}
  </FastField>
)
