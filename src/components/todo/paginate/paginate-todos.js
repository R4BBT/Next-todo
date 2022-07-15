import { Box, Button, Flex, Text } from '@chakra-ui/react'

export const PaginateTodos = () => {
  const nextPageHandler = async () => {}
  const previousPageHandler = () => {}

  return (
    <Flex p={3} justifyContent="space-between">
      <Text>Total</Text>
      <Box>
        <Button onClick={previousPageHandler}>Previous</Button>
        <Button onClick={nextPageHandler}>Next</Button>
      </Box>
    </Flex>
  )
}
