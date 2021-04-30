import { useEffect, useMemo, useState, VFC } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../Authenticator'
import { AppNavBar, NavItemT, setItemActive } from 'baseui/app-nav-bar'
import { useListCategories } from '../../api/queries'
import { ChevronDown, Delete } from 'baseui/icon'

export const Nav: VFC = () => {
  const router = useRouter()
  const auth = useAuth()
  const username = useMemo(() => auth.user?.username ?? 'Anonymous', [
    auth.user?.username,
  ])
  const [userItems, setUserItems] = useState<NavItemT[]>(() => {
    return !!auth.user?.username ? [{ label: 'Login' }] : [{ label: 'Logout' }]
  })

  const { data: { pages } = { pages: [] } } = useListCategories({ limit: 100 })

  const [mainItems, setMainItems] = useState<NavItemT[]>(
    [
      {
        label: 'Home',
      },
      {
        label: 'Recipes',
        active: router.asPath === '/recipes',
      },
      {
        label: 'Categories',
        icon: ChevronDown,
        navExitIcon: Delete,
        children: [],
      },
      !!auth.user?.username && {
        label: 'Administer',
        active: router.asPath === '/admin',
      },
    ].filter(Boolean),
  )

  useEffect(() => {
    if (auth.user?.username) {
      setUserItems([{ label: 'Logout' }])
      setMainItems((prev) => {
        if (prev[prev.length - 1].label !== 'Administer') {
          return [...prev, { label: 'Administer' }]
        }

        return prev
      })
      return
    }

    setUserItems([{ label: 'Login' }])
    setMainItems((prev) => {
      if (prev[prev.length - 1].label !== 'Administer') {
        return prev
      }

      return prev.filter(({ label }) => label !== 'Administer')
    })
  }, [auth.user?.username])

  const categoryItems = useMemo(
    () =>
      pages.flatMap<NavItemT>(({ items = [] }) =>
        items.map<NavItemT>(({ id, name }) => ({
          label: name,
          info: { id },
        })),
      ),
    [pages],
  )

  useEffect(() => {
    setMainItems((prev) =>
      prev.map((item) => {
        if (item.label !== 'Categories') {
          return item
        }

        return { ...item, children: categoryItems }
      }),
    )
  }, [categoryItems])

  return (
    <AppNavBar
      title="Gram's Recipes"
      mainItems={mainItems}
      username={username}
      userImgUrl=""
      userItems={userItems}
      onMainItemSelect={(item) => {
        const { label, info = {} } = item

        switch (label) {
          case 'Home':
            setMainItems((prev) => setItemActive(prev, item))
            router.push('/')
            break
          case 'Administer':
            setMainItems((prev) => setItemActive(prev, item))
            router.push('/admin')
            break
          case 'Recipes':
            setMainItems((prev) => setItemActive(prev, item))
            router.push('/recipes')
            break
          case 'Categories':
            setMainItems((prev) => {
              // State race may yield this item with 0 children.
              // Prop spreading causes rerender to close the menu.
              // Modify the children array without creating a new item object.
              if (item.children.length === 0) {
                item.children.push(...categoryItems)
              }
              return setItemActive(prev, item)
            })
            break
          default:
            if ('id' in info) {
              router.push(`/categories/${info.id}`)
            }

            setMainItems((prev) => setItemActive(prev, item))
            break
        }
      }}
      onUserItemSelect={({ label }) => {
        if (label === 'Logout') {
          router.push('/logout')
        }

        if (label === 'Login') {
          router.push('/admin')
        }
      }}
    />
  )
}
