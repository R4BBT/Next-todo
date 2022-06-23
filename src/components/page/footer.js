import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <Flex
      justify="center"
      alignContent="center"
      bg={useColorModeValue('gray.600', 'black')}
    >
      <Link href="/" passHref>
        <Text
          fontSize="xl"
          color="white"
          mx={10}
          _hover={{ cursor: 'pointer' }}
        >
          Home
        </Text>
      </Link>
      <Link href="/404" passHref>
        <Text
          fontSize="xl"
          color="white"
          mx={10}
          _hover={{ cursor: 'pointer' }}
        >
          404
        </Text>
      </Link>
    </Flex>
  )
}
