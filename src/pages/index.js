import { SimpleGrid } from '@chakra-ui/react'
import { Protect } from 'components/auth'
import { Title } from 'components/page'
import { AddTodos, FilterTodos, ViewTodos } from 'components/todo'

// TODO
// Generate a list of todos
// Create skeleton of dashboard

// ViewTodos =dynamic(() => { import('../components/todo/view-todos') }, {ssr: false})

const Home = () => {
  return (
    <>
      <Title title="Todo Application" />
      <Protect>
        <SimpleGrid gridTemplateColumns="1fr" gridAutoRows="auto">
          <AddTodos colSpan={1} />
          <FilterTodos colSpan={1} />
          <ViewTodos colSpan={1} />
        </SimpleGrid>
      </Protect>
    </>
  )
}

export default Home
