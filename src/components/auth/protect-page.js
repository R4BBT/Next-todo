import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'utils/contexts/auth-context'

export const Protect = ({ children }) => {
  const { authenticated, loading } = useAuth()
  const router = useRouter()
  const route = router.pathname

  // If this is disabled, refresh will not push user to their original page
  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        if (route !== '/') {
          // If this check is not here it will cause an infinite loop at home page
          router.push('/')
        }
      }
    }
  }, [router, loading, route, authenticated])

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }

  if (!loading && authenticated) {
    return <>{children}</>
  }

  return null
}
