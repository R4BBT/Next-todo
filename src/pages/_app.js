import {
  ChakraProvider,
  ColorModeScript,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import { ErrorBoundary } from 'components/error/error-boundary'
import { Footer, Layout, Navbar } from 'components/page'
import theme from 'styles/theme'
import { AuthContextProvider } from 'utils/contexts/auth-context'
import { TaskContextProvider } from 'utils/contexts/task-context'

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
          <TaskContextProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {getLayout(<Component {...pageProps} />)}
            <Analytics />
          </TaskContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default MyApp
