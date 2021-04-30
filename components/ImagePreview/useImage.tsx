import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'

export const useImage = (key?: string): string | null => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (key) {
      Storage.get(key)
        .then((signedUrl: string) => setUrl(signedUrl))
        .catch((e) => {
          console.log(e)
        })
    }
  }, [key])

  return url
}
