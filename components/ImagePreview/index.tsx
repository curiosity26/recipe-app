import { useEffect, useState, VFC } from 'react'
import { Storage } from 'aws-amplify'
import { AspectRatioBox, AspectRatioBoxBody } from 'baseui/aspect-ratio-box'
import { Button, SHAPE, SIZE } from 'baseui/button'
import { useStyletron } from 'baseui'
import { useImage } from './useImage'

export type ImagePreviewProps = {
  readonly fileKey: string
  readonly onRemove?: () => void
}

export const ImagePreview: VFC<ImagePreviewProps> = ({
  fileKey: key,
  onRemove = () => {},
}) => {
  const [, theme] = useStyletron()
  const url = useImage(key)

  return (
    <AspectRatioBox aspectRatio={16 / 9}>
      <AspectRatioBoxBody
        $style={
          url && {
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }
        }
        padding={theme.sizing.scale600}
      >
        <Button shape={SHAPE.pill} onClick={() => onRemove()} size={SIZE.mini}>
          Remove
        </Button>
      </AspectRatioBoxBody>
    </AspectRatioBox>
  )
}
