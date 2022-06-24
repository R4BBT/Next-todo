import { Button, Flex } from '@chakra-ui/react'
import { FaMicrosoft } from 'react-icons/fa'
import { useAuth } from 'utils/contexts/auth-context'

export const MicrosoftLoginButton = ({ ...rest }) => {
  const { onMicrosoftLogin } = useAuth()
  const OAuthSignInHandler = () => {
    onMicrosoftLogin()
  }

  return (
    <Flex {...rest}>
      <Button
        py={2}
        w="full"
        colorScheme="green"
        onClick={OAuthSignInHandler}
        leftIcon={<FaMicrosoft />}
      >
        Continue with Microsoft
      </Button>
    </Flex>
  )
}
