import { SimpleGrid } from '@chakra-ui/react'
import { AdminBoard } from 'components/home'
import { AddTodos, ViewTodos } from 'components/home/todo'
import { Title } from 'components/page'

// TODO
// Generate a list of todos
// Create skeleton of dashboard
const Home = () => {
  return (
    <>
      <Title title="Todo Application" />
      <SimpleGrid
        gridTemplateColumns={{
          base: '1fr',
          sm: '1fr',
          md: '300px 1fr',
        }}
        gridTemplateRows="auto 1fr"
        spacing="4"
        height="full"
      >
        <AdminBoard
          colStart={1}
          colEnd={2}
          display={{ base: 'none', sm: 'none', md: 'block' }}
          rowSpan={2}
        />
        <AddTodos colStart={{ base: 1, md: 2 }} colEnd={{ base: 1, md: 3 }} />
        <ViewTodos colStart={{ base: 1, md: 2 }} colEnd={{ base: 1, md: 3 }} />
      </SimpleGrid>
    </>
  )
}

export default Home
