import { useEffect, useRef, VFC } from 'react'
import { Block } from 'baseui/block'
import { Spinner } from 'baseui/spinner'
import { useStyletron } from 'baseui'

export type ScrollPaginationProps = {
  readonly onPage: () => void
  readonly loading?: boolean
  readonly complete?: boolean
}

export const ScrollPagination: VFC<ScrollPaginationProps> = ({
  onPage,
  loading = false,
  complete = false,
}) => {
  const [, theme] = useStyletron()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (complete) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && onPage()),
      {
        root: ref?.current,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )

    if (!ref.current) {
      return
    }

    observer.observe(ref.current)

    return () => {
      if (!ref.current) {
        return
      }
      observer.unobserve(ref.current)
    }
  }, [complete, ref.current])

  return (
    <Block
      display="flex"
      justifyContent="center"
      padding={theme.sizing.scale600}
      ref={ref}
    >
      {loading && <Spinner size={theme.sizing.scale800} />}
    </Block>
  )
}
