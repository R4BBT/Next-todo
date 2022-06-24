import {
  ChakraProvider,
  ColorModeScript,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { ErrorBoundary } from 'components/error/error-boundary'
import { Footer, Layout, Navbar } from 'components/page'
import theme from 'styles/theme'
import { AuthContextProvider } from 'utils/contexts/auth-context'

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((Component) => (
      <>
        <Grid templateRows="auto 1fr auto" height="100vh">
          <GridItem>
            <Navbar />
          </GridItem>
          <GridItem>
            <Layout>{Component}</Layout>
          </GridItem>
          <GridItem>
            <Footer />
          </GridItem>
        </Grid>
      </>
    ))

  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {getLayout(<Component {...pageProps} />)}
        </AuthContextProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default MyApp
