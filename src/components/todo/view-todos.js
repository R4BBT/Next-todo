import {
  GridItem,
  ListItem,
  Spinner,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
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

export const ViewTodos = ({ ...rest }) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState()
  const toast = useToast()

  const userTaskCollectionReference = collection(db, 'todos/anonymous/tasks')
  const userTaskQueryReference = query(
    userTaskCollectionReference,
    orderBy('created_at'),
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
  }, [])

  return (
    <GridItem {...rest}>
      <Card>
        <UnorderedList spacing={4} styleType="none">
          {isLoading ? (
            <Spinner />
          ) : data ? (
            data.map((task) => {
              return (
                <ListItem key={task.id} id={task.id}>
                  title: {task.title}
                </ListItem>
              )
            })
          ) : (
            <Spinner />
          )}
        </UnorderedList>
      </Card>
    </GridItem>
  )
}
