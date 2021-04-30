import Head from 'next/head'
import Amplify from 'aws-amplify'
import { withAuthenticator } from '../components/Authenticator'
import awsExports from '../aws-exports'
import { Key, useState, VFC } from 'react'
import { Tabs, Tab } from 'baseui/tabs-motion'
import { CategoriesTab } from '../components/Category/tab'
import { RecipeTab } from '../components/Recipe/tab'
import { Block } from 'baseui/block'
import { useRouter } from 'next/router'

Amplify.configure({ ...awsExports, ssr: true })

const AdminPage: VFC = () => {
  const router = useRouter()
  const [activeKey, setActiveKey] = useState<Key>('0')

  return (
    <>
      <Head>
        <title>Gram's Recipes - Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Block display="flex" flex="1 0 100%">
        <Tabs
          activeKey={activeKey}
          activateOnFocus
          onChange={({ activeKey: key }) => {
            setActiveKey(key)
            router.push(
              `${router.basePath}?tab=${
                key === '1' ? 'recipes' : 'categories'
              }`,
            )
          }}
          orientation="vertical"
          overrides={{
            Root: {
              style: {
                width: '100%',
              },
            },
          }}
        >
          <Tab
            title="Categories"
            overrides={{
              Tab: {
                style: {
                  width: '100%',
                },
              },
            }}
          >
            <CategoriesTab />
          </Tab>
          <Tab title="Recipes">
            <RecipeTab />
          </Tab>
        </Tabs>
      </Block>
    </>
  )
}

export default withAuthenticator(AdminPage)
