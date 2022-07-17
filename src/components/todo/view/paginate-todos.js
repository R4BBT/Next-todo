import { Button, Flex, Text } from '@chakra-ui/react'
import { useTask } from 'utils/contexts/task-context'

export const PaginateTodos = ({ pageStart, pageEnd }) => {
  // Initialize
  const { totalItems, numberOfFullPages, pageSet, setPageSet } = useTask()

  const nextPageHandler = () => {
    setPageSet((prevState) => prevState + 1)
  }

  const previousPageHandler = () => {
    setPageSet((prevState) => prevState - 1)
  }

  return (
    <Flex p={3} justifyContent="space-between" alignItems="center">
      <Flex>
        <Text fontWeight="semibold">Total:&nbsp;</Text>
        <Text>{totalItems}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Button
          onClick={previousPageHandler}
          isDisabled={pageSet === 0}
          variant="ghost"
          _hover={{ bg: 'transparent' }}
        >
          Previous
        </Button>

        <Text fontSize="lg" fontWeight="semibold">
          {pageStart + 1}...{pageEnd}
        </Text>
        <Button
          onClick={nextPageHandler}
          isDisabled={pageSet === numberOfFullPages}
          variant="ghost"
          _hover={{ bg: 'transparent' }}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}
