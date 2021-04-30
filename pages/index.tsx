import Head from 'next/head'
import Amplify from 'aws-amplify'
import awsExports from '../aws-exports'
import styles from '../styles/Home.module.css'
import { useSearchRecipes } from '../api/queries'
import { useState } from 'react'
import { Input } from 'baseui/input'
import { useStyletron } from 'baseui'
import { Block } from 'baseui/block'
import { motion } from 'framer-motion'
import { SearchCard } from '../components/Recipe/SearchCard'
import { Search, Spinner } from 'baseui/icon'
import { ScrollPagination } from '../components/ScrollPagination'

Amplify.configure({ ...awsExports, ssr: true })

const MotionBlock = motion(Block)

export default function Home() {
  const [, theme] = useStyletron()
  const [query, setQuery] = useState<string | null>(null)
  const {
    data: { pages } = { pages: [] },
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useSearchRecipes(query, 24)

  const variants = {
    top: {
      translateY: '0%',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
    centered: {
      translateY: '50%',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const rowMobile = `"search"
  "result"`
  const rowTablet = `". search ."
  "result result result"`
  const rowDesktop = `". . search . ."
  ". result result result ."`

  return (
    <div className={styles.container}>
      <Head>
        <title>Gram's Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <MotionBlock
          initial="centered"
          variants={variants}
          animate={pages[0]?.items?.length > 0 || query ? 'top' : 'centered'}
          display="grid"
          gridGap={theme.sizing.scale600}
          gridTemplateAreas={[rowMobile, rowMobile, rowTablet, rowDesktop]}
          gridTemplateRows="min-content max-content"
          width="100%"
        >
          <Block
            maxWidth="800px"
            gridArea="search"
            width={['90vw', '80vw']}
            justifySelf="center"
          >
            <Input
              onChange={(e) => setQuery((e.target as HTMLInputElement)?.value)}
              placeholder="Search for Recipes..."
              startEnhancer={
                isLoading ? (
                  <Spinner size={theme.sizing.scale800} />
                ) : (
                  <Search size={theme.sizing.scale800} />
                )
              }
            />
          </Block>
          {pages[0]?.items?.length > 0 && (
            <>
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
              <ScrollPagination
                onPage={fetchNextPage}
                loading={isLoading}
                complete={!hasNextPage}
              />
            </>
          )}
        </MotionBlock>
      </main>
    </div>
  )
}
