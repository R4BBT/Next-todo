import { GridItem, Spinner, UnorderedList, useToast } from '@chakra-ui/react'
import { Card } from 'components/general'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from 'utils/configs/firebase-client'
import { useAuth } from 'utils/contexts/auth-context'
import { TodoListItem } from './view-todo-list'

export const ViewTodos = ({ ...rest }) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState()
  const toast = useToast()
  const { authenticated, user } = useAuth()

  let userID = authenticated ? user.uid : 'anonymous'

  const userTaskCollectionReference = collection(db, `todos/${userID}/tasks`)
  const userTaskQueryReference = query(
    userTaskCollectionReference,
    orderBy('createdAt'),
    limit(10)
  )

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(
      userTaskQueryReference,
      (querySnapshot) => {
        const tasks = []
        querySnapshot.forEach(
          (doc) => tasks.push({ id: doc.id, ...doc.data() }) //doc.data() does not include id
        )
        setData(tasks)
      },
      (error) => {
        toast({
          status: 'error',
          title: 'An error has occured',
          description: `${error.message}`,
          isClosable: true,
        })
      }
    )
    setIsLoading(false)

    return () => {
      unsub()
    }
  }, [userID])

  return (
    <GridItem {...rest}>
      <Card>
        <UnorderedList spacing={4} styleType="none" ml={0}>
          {isLoading ? (
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
