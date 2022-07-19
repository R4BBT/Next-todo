import { SimpleGrid } from '@chakra-ui/react'
import { Protect } from 'components/auth'
import { Marketing } from 'components/marketing'
import { Title } from 'components/page'
import { AddTodos, FilterTodos, ViewTodos } from 'components/todo'
import { useAuth } from 'utils/contexts/auth-context'

// TODO
// Generate a list of todos
// Create skeleton of dashboard

const Home = () => {
  const { authenticated } = useAuth()
  return (
    <>
      <Title title="Todo Application" />
      {!authenticated && <Marketing />}
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
