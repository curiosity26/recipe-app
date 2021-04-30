import plur from 'plur'
import React, { VFC } from 'react'
import Head from 'next/head'
import { Block } from 'baseui/block'
import { useImage } from '../../components/ImagePreview/useImage'
import { useStyletron } from 'baseui'
import { Tag } from 'baseui/tag'
import { getCookMethodLabel } from '../../components/Recipe/cookMethods'
import { getUnitLabel } from '../../components/Recipe/unitLabels'
import styles from './Recipe.module.css'
import { Paragraph3, Paragraph4 } from 'baseui/typography'
import { useGetRecipe } from '../../api/queries'
import { useRouter } from 'next/router'
import { Spinner } from 'baseui/spinner'
import Error from 'next/error'
import { CookTimeUnit } from '../../api'

const RecipePage: VFC = () => {
  const [, theme] = useStyletron()
  const router = useRouter()
  const { data: recipe, isLoading } = useGetRecipe({
    id: router.query.id as string,
    throwIfNotFound: true,
  })

  const image = useImage(recipe?.image)

  if (isLoading) {
    return (
      <Block
        display="flex"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Block>
    )
  }

  if (!isLoading && (!recipe || router.query.id !== recipe?.id)) {
    return <Error statusCode={404} />
  }

  const hasKeywords = recipe.keywords && recipe.keywords.length > 0
  const padding = theme.sizing.scale600

  return (
    <Block
      display="grid"
      gridTemplateColumns={[
        `${padding} [content-start]auto[content-end] ${padding}`,
        `${padding} [content-start]auto[content-end] ${padding}`,
        'auto [content-start]80vw[content-end] auto',
        'auto [content-start]920px[content-end] auto',
      ]}
    >
      <Head>
        <title>Gram's Recipes | {recipe.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {image && (
        <Block
          gridColumnStart="1"
          gridColumnEnd="-1"
          height={['250px', '250px', '350px', '450px']}
          $style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      <Block gridArea="content">
        <div className={styles.title}>{recipe.title}</div>
        {(recipe.category || hasKeywords) && (
          <Block display="flex" alignItems="center">
            {recipe.category && (
              <Block className={styles.category} flex="1 1 auto">
                <Paragraph3 color={theme.colors.contentSecondary}>
                  {recipe.category.name}
                </Paragraph3>
              </Block>
            )}
            {hasKeywords && (
              <Block display="flex" justifyContent="flex-end" flex="1 0 auto">
                {recipe.keywords.map((keyword) => (
                  <Tag key={keyword} closeable={false}>
                    {keyword.toLowerCase()}
                  </Tag>
                ))}
              </Block>
            )}
          </Block>
        )}

        <Block
          gridTemplateColumns={'max-content auto'}
          gridGap={`${theme.sizing.scale400} ${theme.sizing.scale1000}`}
          display="grid"
          className={styles.details}
        >
          {recipe.cookMethods && recipe.cookMethods.length > 0 && (
            <>
              <Block>Cook Method</Block>
              <Block className={styles.detail}>
                {recipe.cookMethods
                  .map((method) => getCookMethodLabel(method))
                  .join(', ')}
              </Block>
            </>
          )}
          {recipe.servings && (
            <>
              <Block>Servings</Block>
              <Block className={styles.detail}>{recipe.servings}</Block>
            </>
          )}
          {recipe.prepTime && (
            <>
              <Block>Prep Time</Block>
              <Block className={styles.detail}>
                {recipe.prepTime}{' '}
                {plur(
                  recipe.prepTimeUnit === CookTimeUnit.HOURS
                    ? 'Hour'
                    : 'Minute',
                  recipe.prepTime,
                )}
              </Block>
            </>
          )}
          {recipe.cookTime && (
            <>
              <Block>Cook Time</Block>
              <Block className={styles.detail}>
                {recipe.cookTime}{' '}
                {plur(
                  recipe.cookTimeUnit === CookTimeUnit.MINUTES
                    ? 'Minute'
                    : 'Hour',
                  recipe.cookTime,
                )}
              </Block>
            </>
          )}
        </Block>

        {recipe.description && (
          <div className={styles.description}>{recipe.description}</div>
        )}

        <div className={styles.subtitle}>Ingredients</div>
        <Block
          gridTemplateColumns={'max-content max-content auto'}
          display="grid"
          className={styles.ingredients}
        >
          {recipe.ingredients.map(
            ({ measurement, unit, description }, index) => (
              <React.Fragment key={index}>
                <Block className={styles.ingredient_measurement}>
                  {measurement}
                </Block>
                <Block className={styles.ingredient_unit}>
                  {getUnitLabel(unit)}
                </Block>
                <Block className={styles.ingredient_description}>
                  {description}
                </Block>
              </React.Fragment>
            ),
          )}
        </Block>

        <div className={styles.subtitle}>Instructions</div>
        {recipe.steps
          .sort((a, b) => {
            if (a.order > b.order) return 1
            if (a.order < b.order) return -1
            return 0
          })
          .map(({ instruction, order }) => (
            <Block className={styles.step} key={order}>
              {instruction}
            </Block>
          ))}

        <Block
          as="footer"
          display="flex"
          height={theme.sizing.scale2400}
          alignItems="flex-end"
          justifyContent="center"
          padding={theme.sizing.scale600}
        >
          <Paragraph4>&copy; 2021. All Rights Reserved</Paragraph4>
        </Block>
      </Block>
    </Block>
  )
}

export default RecipePage
