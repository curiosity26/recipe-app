import { LightTheme, BaseProvider } from 'baseui'
import { Provider as StyletronProvider } from 'styletron-react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { styletron } from '../styletron'
import '../styles/globals.css'
import { AuthContextProvider } from '../components/Authenticator'
import { Nav } from '../components/Nav'
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient()

function RecipeApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <QueryClientProvider client={client}>
          <AuthContextProvider>
            <Nav />
            <Component {...pageProps} />
          </AuthContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default RecipeApp
