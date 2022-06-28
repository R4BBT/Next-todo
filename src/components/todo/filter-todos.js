import { Box, Flex, GridItem, IconButton, Text } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import { BiFilter, BiSortAlt2 } from 'react-icons/bi'

export const FilterTodo = ({ ...rest }) => {
  return (
    <GridItem pt={5} {...rest}>
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box flexBasis={0} flexGrow={1}>
            View
          </Box>
          <Text as="h1" fontSize="xl" fontWeight="bold">
            Tasks
          </Text>
          <Box flexBasis={0} flexGrow={1} display="flex" justifyContent="end">
            <IconButton icon={<BiSortAlt2 />} variant="ghost" />
            <IconButton icon={<BiFilter />} variant="ghost" />
          </Box>
        </Flex>
      </IconContext.Provider>
    </GridItem>
  )
}
