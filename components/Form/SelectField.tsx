import { VFC } from 'react'
import { FastField } from 'formik'
import { FormControl, FormControlProps } from 'baseui/form-control'
import { OptgroupsT, Option, Select, SelectProps, Value } from 'baseui/select'

export type SelectOption = (Option & { readonly value: unknown }) | OptgroupsT

export type SelectOptions = ReadonlyArray<SelectOption>

export type SelectFieldProps = {
  readonly name: string
  readonly controlOverrides?: FormControlProps['overrides']
  readonly selectOverrides?: SelectProps['overrides']
  readonly options: SelectOptions
  readonly value?: (value?: unknown) => unknown
} & Omit<FormControlProps, 'children' | 'error' | 'overrides'> &
  Omit<SelectProps, 'error' | 'options' | 'value'>

export const SelectField: VFC<SelectFieldProps> = ({
  name,
  label,
  options,
  onChange,
  value,
  ...props
}) => (
  <FastField name={name}>
    {({
      meta: { touched, error },
      field: { value: fieldValue, ...field },
      form: { setFieldValue },
    }) => (
      <FormControl label={label} error={touched && error}>
        <Select
          {...field}
          {...props}
          error={touched && !!error}
          options={options}
          onChange={(e) => {
            const { value: optValue } = e
            onChange && onChange(e)
            const value = props.multi
              ? optValue?.map(({ value }) => value)
              : optValue[0]?.value
            setFieldValue(field.name, value, true)
          }}
          value={
            (value
              ? value(fieldValue) ??
                ((fieldValue && [
                  {
                    id: `${fieldValue}`,
                    label: fieldValue,
                    value: fieldValue,
                  },
                ]) ||
                  [])
              : []) as Value
          }
        />
      </FormControl>
    )}
  </FastField>
)
