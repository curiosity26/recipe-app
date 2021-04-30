import { VFC } from 'react'
import { FastField, FastFieldProps } from 'formik'
import { ImagePreview } from '../ImagePreview'
import { ImageUploader } from '../ImageUploader'

export type ImageFieldProps = {
  readonly name: string
}

export const ImageField: VFC<ImageFieldProps> = ({ name }) => {
  return (
    <FastField name={name}>
      {({
        meta: { touched, error },
        field,
        form: { setFieldValue, setFieldError },
      }: FastFieldProps<string>) => {
        if (field.value) {
          return (
            <ImagePreview
              fileKey={field.value}
              onRemove={() => setFieldValue(field.name, null)}
            />
          )
        }

        return (
          <ImageUploader
            errorMessage={touched && error}
            onError={(e) => setFieldError(field.name, e.message)}
            onComplete={(key) => {
              setFieldValue(field.name, key)
            }}
          />
        )
      }}
    </FastField>
  )
}
