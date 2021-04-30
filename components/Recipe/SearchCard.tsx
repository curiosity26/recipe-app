import { Recipe } from '../../api'
import { VFC } from 'react'
import { useImage } from '../ImagePreview/useImage'
import { StyledBody } from 'baseui/card'
import { Button } from 'baseui/button'
import { AspectRatioBox, AspectRatioBoxBody } from 'baseui/aspect-ratio-box'
import { HeadingSmall, Paragraph3 } from 'baseui/typography'
import { useRouter } from 'next/router'
import { Block } from 'baseui/block'
import { useStyletron } from 'baseui'
import { useGetCategory } from '../../api/queries'

export type SearchCardProps = {
  readonly recipe: Recipe
}

export const SearchCard: VFC<SearchCardProps> = ({ recipe }) => {
  const url = useImage(recipe.image)
  const router = useRouter()
  const [, theme] = useStyletron()
  const { data: category } = useGetCategory(recipe.recipeCategoryId)

  return (
    <Block
      padding={theme.sizing.scale600}
      display="grid"
      gridTemplateRows="max-content auto max-content 1fr auto"
      $style={{
        border: `1px solid ${theme.colors.border}`,
      }}
    >
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
        />
      </AspectRatioBox>
      <HeadingSmall margin="1em 0 0">{recipe.title}</HeadingSmall>
      <Paragraph3
        color={theme.colors.mono600}
        $style={{
          textTransform: 'uppercase',
        }}
      >
        {category?.name}
      </Paragraph3>
      <StyledBody flex="1 1">{recipe.description}</StyledBody>
      <Block>
        <Button
          $style={{ width: '100%' }}
          onClick={() => router.push(`/recipe/${recipe.id}`)}
        >
          View Recipe
        </Button>
      </Block>
    </Block>
  )
}
