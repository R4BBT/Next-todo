import { Button, Flex } from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'
import { useAuth } from 'utils/contexts/auth-context'
export const GoogleLoginButton = ({ ...rest }) => {
  const { onGoogleLogin } = useAuth()
  const OAuthSignInHandler = () => {
    onGoogleLogin()
  }

  return (
    <Flex {...rest}>
      <Button
        py={2}
        w="full"
        colorScheme="blue"
        onClick={OAuthSignInHandler}
        leftIcon={<FaGoogle color="white" />}
      >
        Continue with Google
      </Button>
    </Flex>
  )
}
