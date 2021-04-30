import { useState, VFC } from 'react'
import { Storage } from 'aws-amplify'
import { FileUploader } from 'baseui/file-uploader'

export const generateRandomFileKey = (): string =>
  Array.from({ length: 20 }, () =>
    String.fromCharCode(
      65 +
        (Math.random() > 0.5 ? 32 : 0) +
        Number((26 * Math.random()).toFixed(0)),
    ),
  ).join('')

export type ImageUploaderProps = {
  readonly errorMessage?: string
  readonly onError?: (err: Error) => void
  readonly onComplete?: (key: string) => void
}

export const ImageUploader: VFC<ImageUploaderProps> = ({
  errorMessage,
  onError = () => {},
  onComplete = () => {},
}) => {
  const [progress, setProgress] = useState(0)
  return (
    <FileUploader
      errorMessage={errorMessage}
      accept={['image/*']}
      onDrop={([file]) => {
        if (!file) return
        const ext = file.name.split('.').pop()
        const key = generateRandomFileKey()

        Storage.put(`${key}.${ext}`, file, {
          progressCallback: (progress) => {
            setProgress((progress.loaded / progress.total) * 100)
          },
        })
          .then(({ key }: { readonly key: string }) => onComplete(key))
          .catch((e) => onError(e))
      }}
      progressAmount={progress}
    />
  )
}
