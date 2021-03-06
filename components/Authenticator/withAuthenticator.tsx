import React, {
  ComponentType,
  ComponentPropsWithRef,
  FunctionComponent,
} from 'react'
import { Auth, appendToCognitoUserAgent } from '@aws-amplify/auth'
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components'
import { Logger } from '@aws-amplify/core'
import { AmplifyAuthenticator, AmplifyContainer } from '@aws-amplify/ui-react'
import { useAuth } from './context'

const logger = new Logger('withAuthenticator')

export function withAuthenticator<P = {}>(
  Component: ComponentType<P>,
  authenticatorProps?: ComponentPropsWithRef<typeof AmplifyAuthenticator>,
) {
  const AppWithAuthenticator: FunctionComponent<P> = (props) => {
    const [signedIn, setSignedIn] = React.useState(false)

    React.useEffect(() => {
      appendToCognitoUserAgent('withAuthenticator')

      // checkUser returns an "unsubscribe" function to stop side-effects
      return checkUser()
    }, [])

    function checkUser() {
      setUser()

      return onAuthUIStateChange((authState) => {
        if (authState === AuthState.SignedIn) {
          setSignedIn(true)
        } else if (authState === AuthState.SignedOut) {
          setSignedIn(false)
        }
      })
    }

    async function setUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        if (user) {
          setSignedIn(true)
        }
      } catch (err) {
        logger.debug(err)
      }
    }

    if (!signedIn) {
      return (
        <AmplifyContainer>
          <AmplifyAuthenticator {...authenticatorProps} {...props} />
        </AmplifyContainer>
      )
    }

    return <Component {...props} />
  }

  return AppWithAuthenticator
}
