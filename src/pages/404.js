import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={() => {
          router.push('/')
        }}
      >
        Go to Home
      </Button>
    </Box>
  )
}

export default NotFound
