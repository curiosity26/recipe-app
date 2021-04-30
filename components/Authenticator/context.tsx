import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { User } from '../../api'
import { Amplify, Hub, Auth } from 'aws-amplify'
import awsExports from '../../aws-exports'

Amplify.configure(awsExports)

type AuthContextApi = {
  readonly user?: User
  readonly setUser: (user?: User) => void
  readonly logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextApi>({
  setUser: () => {},
  logout: () => Promise.resolve(),
})

export const useAuth = (): AuthContextApi => useContext(AuthContext)

export const useAuthUser = (): User | undefined => {
  const { user } = useAuth()

  return user
}

export type AuthContextProviderProps = {
  readonly user?: User
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  user: initUser,
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(initUser)
  const logout = useCallback(
    () =>
      Auth.signOut().then(() => {
        setUser(undefined)
      }),
    [],
  )

  useEffect(() => {
    Auth.currentUserInfo().then((creds: User) => {
      setUser(creds)
    })
  }, [])

  useEffect(() => {
    const listener = (data) => {
      switch (data.payload?.event) {
        case 'signIn':
          setUser(data.payload.data)
          break
      }
    }
    Hub.listen('auth', listener)

    return () => Hub.remove('auth', listener)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
