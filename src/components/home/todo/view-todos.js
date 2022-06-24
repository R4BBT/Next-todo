import { Container, GridItem, ListItem, UnorderedList } from '@chakra-ui/react'
import { Card } from 'components/general'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from 'utils/configs/firebase-client'

export const ViewTodos = ({ ...rest }) => {
  const [todos, SetTodos] = useState()
  const usersCollectionReference = doc(db, 'todos/anonymous')

  useEffect(() => {
    const getTodos = async () => {
      const users = await getDoc(usersCollectionReference)
      const userData = users.data()
      SetTodos(userData)
    }
    getTodos()
  }, [])

  return (
    <GridItem {...rest}>
      <Container maxWidth="container.xl">
        <Card>
          <UnorderedList spacing={4} styleType="none">
            <ListItem>Item #1</ListItem>
            <ListItem>Item #2</ListItem>
            <ListItem>Item #3</ListItem>
            <ListItem>Item #4</ListItem>
          </UnorderedList>
        </Card>
      </Container>
    </GridItem>
  )
}
