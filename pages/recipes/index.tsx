import { VFC } from 'react'
import { useListRecipes } from '../../api/queries'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { Block } from 'baseui/block'
import { SearchCard } from '../../components/Recipe/SearchCard'
import { ScrollPagination } from '../../components/ScrollPagination'
import { useStyletron } from 'baseui'
import { HeadingMedium, Paragraph2 } from 'baseui/typography'

const RecipesPage: VFC = () => {
  const [, theme] = useStyletron()
  const {
    data: { pages } = { pages: [] },
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useListRecipes()

  return (
    <div className={styles.container}>
      <Head>
        <title>Gram's Recipes | Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Block as="main" flex="1 1">
        <Block
          paddingLeft={theme.sizing.scale600}
          paddingRight={theme.sizing.scale600}
        >
          <HeadingMedium>All Recipes</HeadingMedium>
        </Block>
        {pages[0]?.items?.length > 0 && (
          <Block
            display="grid"
            gridTemplateColumns={[
              '1fr',
              '1fr',
              '1fr 1fr 1fr',
              '1fr 1fr 1fr 1fr',
            ]}
            gridArea="result"
            gridGap={theme.sizing.scale600}
            paddingLeft={theme.sizing.scale600}
            paddingRight={theme.sizing.scale600}
          >
            {pages.flatMap(({ items = [] }) =>
              items.map((recipe) => (
                <SearchCard key={recipe.id} recipe={recipe} />
              )),
            )}
          </Block>
        )}
        {!pages[0]?.items?.length && (
          <Block justifyContent="center" display="flex">
            <Paragraph2>No recipes found</Paragraph2>
          </Block>
        )}
        <ScrollPagination
          onPage={fetchNextPage}
          loading={isLoading}
          complete={!hasNextPage}
        />
      </Block>
    </div>
  )
}

export default RecipesPage
