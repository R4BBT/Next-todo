import { GridItem, Spinner, UnorderedList } from '@chakra-ui/react'
import { Card } from 'components/general'
import { useEffect, useState } from 'react'
import { useAuth } from 'utils/contexts/auth-context'
import { useTask } from 'utils/contexts/task-context'
import { PaginateTodos } from './paginate-todos'
import { TodoListItem } from './view-todo-list'

export const ViewTodos = ({ ...rest }) => {
  const {
    data,
    pageLimit,
    lastPageSize,
    numberOfFullPages,
    pageSet,
    setPageSet,
  } = useTask()
  const { loading } = useAuth()
  const [pageStart, setPageStart] = useState(0)
  const [pageEnd, setPageEnd] = useState(pageLimit - 1)

  useEffect(() => {
    setPageStart(pageSet * pageLimit)
    if (pageSet !== numberOfFullPages) {
      setPageEnd(pageSet * pageLimit + pageLimit)
    } else {
      setPageEnd(pageSet * pageLimit + lastPageSize)
    }
  }, [pageSet, lastPageSize, numberOfFullPages, pageLimit])

  return (
    <GridItem {...rest}>
      <Card>
        <UnorderedList spacing={4} styleType="none" ml={0}>
          {loading ? (
            <Spinner />
          ) : data ? (
            data.map((element, index) => {
              if (index >= pageStart && index < pageEnd)
                return (
                  <TodoListItem
                    key={element.id}
                    id={element.id}
                    data={element}
                  />
                )
            })
          ) : (
            <Spinner />
          )}
        </UnorderedList>
      </Card>
      <PaginateTodos
        pageSet={pageSet}
        setPageSet={setPageSet}
        pageStart={pageStart}
        pageEnd={pageEnd}
      />
    </GridItem>
  )
}
