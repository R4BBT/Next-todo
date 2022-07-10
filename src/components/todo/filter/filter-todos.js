import { Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import { FilterMenu } from './filter-menu'
import { SortMenu } from './sort-menu'
import { ViewMenu } from './view-menu'

export const FilterTodo = ({ ...rest }) => {
  return (
    <GridItem pt={5} {...rest}>
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <SimpleGrid gridTemplateColumns="1fr 1fr 1fr" alignItems="center">
          <Box justifySelf="start">
            <ViewMenu />
          </Box>
          <Text as="h1" fontSize="xl" fontWeight="bold" justifySelf="center">
            Tasks
          </Text>
          <Box display="flex" justifyContent="end">
            <SortMenu />
            <FilterMenu />
          </Box>
        </SimpleGrid>
      </IconContext.Provider>
    </GridItem>
  )
}
