import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../styletron'
import { Server } from 'styletron-engine-atomic'

type RecipesDocumentProps = {
  readonly stylesheets: Array<{
    css: string
    attrs: { [key: string]: string }
  }>
}

class RecipesDocument extends Document<RecipesDocumentProps> {
  static async getInitialProps(context) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: (App) => (props) => (
          <StyletronProvider value={styletron}>
            <App {...props} />
          </StyletronProvider>
        ),
      })

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    })
    const stylesheets = (styletron as Server).getStylesheets() || []
    return { ...initialProps, stylesheets }
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
          <link rel="stylesheet" href="https://use.typekit.net/gup3tgv.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RecipesDocument
