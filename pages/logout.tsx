import { useEffect, VFC } from 'react'
import { useRouter } from 'next/router'
import { Block } from 'baseui/block'
import { Spinner } from 'baseui/spinner'
import { useAuth } from '../components/Authenticator'

const Logout: VFC = () => {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    auth.logout().then(() => {
      router.push('/', '/', {
        shallow: false,
      })
    })
  }, [])

  return (
    <Block display="grid" gridTemplateColumns="1fr">
      <Block
        $style={{ height: '100%' }}
        display="flex"
        flex="1 0 100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Block>
    </Block>
  )
}

export default Logout
