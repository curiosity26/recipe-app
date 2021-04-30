import { FormControl, FormControlProps } from 'baseui/form-control'
import { Textarea, TextareaProps } from 'baseui/textarea'
import { VFC } from 'react'
import { FastField } from 'formik'

export type TextareaFieldProps = {
  readonly name: string
  readonly controlOverrides?: FormControlProps['overrides']
  readonly textareaOverrides?: TextareaProps['overrides']
} & Omit<FormControlProps, 'children' | 'overrides' | 'error'> &
  Omit<TextareaProps, 'error' | 'value'>

export const TextareaField: VFC<TextareaFieldProps> = ({
  name,
  label,
  controlOverrides,
  textareaOverrides,
  ...props
}) => (
  <FastField name={name}>
    {({ meta: { touched, error }, field }) => (
      <FormControl label={label} error={touched && error}>
        <Textarea {...props} {...field} error={Boolean(touched && error)} />
      </FormControl>
    )}
  </FastField>
)
