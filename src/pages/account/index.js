import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Account = () => {
  const toast = useToast()
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    toast({
      status: 'info',
      title: 'Under development',
      description: 'This page is currently under development',
    })
    const routerTimeout = setTimeout(() => {
      router.push('/')
    }, 10000)

    const countdownTimeout = setInterval(() => {
      setCountdown((prevState) => prevState - 1)
    }, 1000)

    return () => {
      clearTimeout(routerTimeout)
      clearTimeout(countdownTimeout)
    }
  }, [toast, router])

  return (
    <Flex justify="start" direction="column" height="100%" alignItems="center">
      <Text fontSize="xl" fontWeight="bold">
        Welcome to this page, it is currently being built.
      </Text>
      <Text fontSize="lg">
        Don&apos;t worry, You will be re-directed back home safely shortly.
      </Text>
      <Box display="block" justifySelf="center">
        <Text fontSize="xl" textAlign="center">
          {countdown}
        </Text>
      </Box>
    </Flex>
  )
}

export default Account
