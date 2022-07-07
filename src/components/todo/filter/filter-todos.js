import { Box, Flex, GridItem, Text } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import { FilterMenu } from './filter-menu'
import { SortMenu } from './sort-menu'
import { ViewMenu } from './view-menu'

export const FilterTodo = ({ ...rest }) => {
  return (
    <GridItem pt={5} {...rest}>
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box flexBasis="auto" flexGrow={1}>
            <ViewMenu />
          </Box>
          <Text as="h1" fontSize="xl" fontWeight="bold">
            Tasks
          </Text>
          <Box
            flexBasis="auto"
            flexGrow={1}
            display="flex"
            justifyContent="end"
          >
            <SortMenu />
            <FilterMenu />
          </Box>
        </Flex>
      </IconContext.Provider>
    </GridItem>
  )
}
