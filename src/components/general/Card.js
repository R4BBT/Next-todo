import { Box, useColorModeValue } from '@chakra-ui/react'

export const Card = ({ children, ...rest }) => {
  return (
    <Box
      minWidth="150px"
      minHeight="150px"
      borderWidth="1px"
      borderRadius="lg"
      shadow="md"
      bg={useColorModeValue('white', 'gray.800')}
      p={3}
      overflow="hidden"
      {...rest}
      my={3}
    >
      {children}
    </Box>
  )
}
