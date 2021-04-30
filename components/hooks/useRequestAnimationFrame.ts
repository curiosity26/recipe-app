import { useEffect, useRef } from 'react'

export type UseRequestAnimationFrameCallback = (
  timestamp: DOMHighResTimeStamp,
) => boolean

const runRequestAnimationFrame = (
  cb: UseRequestAnimationFrameCallback,
  ref: { readonly mounted: boolean },
) => (timestamp) => {
  if (ref.mounted && cb(timestamp)) {
    window.requestAnimationFrame(runRequestAnimationFrame(cb, ref))
  }
}

export const useRequestAnimationFrame = (
  cb: UseRequestAnimationFrameCallback,
) => {
  const ref = useRef({
    mounted: true,
  })

  useEffect(() => {
    window.requestAnimationFrame(runRequestAnimationFrame(cb, ref.current))

    return () => {
      ref.current.mounted = false
    }
  }, [ref])
}
