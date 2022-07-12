import { Button, Flex, Text } from '@chakra-ui/react'

export const PaginateTodos = () => {
  return (
    <Flex p={3} justifyContent="space-between">
      <Text>Total</Text>
      <Button>Next</Button>
    </Flex>
  )
}
