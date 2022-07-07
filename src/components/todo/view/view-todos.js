import { GridItem, Spinner, UnorderedList } from '@chakra-ui/react'
import { Card } from 'components/general'
import { useAuth } from 'utils/contexts/auth-context'
import { useTask } from 'utils/contexts/task-context'
import { TodoListItem } from './view-todo-list'

export const ViewTodos = ({ ...rest }) => {
  const { data } = useTask()
  const { loading } = useAuth()

  return (
    <GridItem {...rest}>
      <Card>
        <UnorderedList spacing={4} styleType="none" ml={0}>
          {loading ? (
            <Spinner />
          ) : data ? (
            data.map((task) => {
              return <TodoListItem key={task.id} id={task.id} data={task} />
            })
          ) : (
            <Spinner />
          )}
        </UnorderedList>
      </Card>
    </GridItem>
  )
}
