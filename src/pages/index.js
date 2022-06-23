import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  ListItem,
  SimpleGrid,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
import { Card } from 'components/general'
import { Title } from 'components/page'
import { addDoc, collection, query } from 'firebase/firestore'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { db } from 'utils/configs/firebase-client'
import { useAuth } from 'utils/contexts/auth-context'

const Home = ({}) => {
  const toast = useToast()
  const { firebaseUid, authenticated } = useAuth()

  useEffect(() => {
    if (!authenticated) {
      // do unauthenticated stuff here
    }

    const q = query(collection(db, 'todo'))

    return () => {}
  }, [authenticated])

  const { handleSubmit, register, setError } = useForm({
    defaultValue: { taskTitle: '' },
  })

  const onAddTaskHandler = async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), { title: `${data}` })
      toast({
        status: 'success',
        title: 'A task has been successfully added',
        description: 'Congratulations!',
        isClosable: true,
      })
    } catch (error) {
      setError('addTaskError', { shouldFocus: true })
      toast({
        status: 'error',
        title: 'An error has occured',
        description: `${error.message}`,
        isClosable: true,
      })
    }
  }
  const onAddTaskErrorHandler = (errors) => {
    console.log(errors)
  }

  return (
    <Box>
      <Title title="Todo App" />

      <SimpleGrid maxwith="200px" mt={5}>
        <GridItem
          as="form"
          onSubmit={handleSubmit(onAddTaskHandler, onAddTaskErrorHandler)}
        >
          <FormControl>
            <FormLabel htmlFor="title" fontSize="lg" fontWeight="semibold">
              Add a task
            </FormLabel>
            <Flex>
              <InputGroup>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter the task"
                  mr={3}
                  {...register('title', { required: true })}
                />
              </InputGroup>
              <Button type="submit">Submit</Button>
            </Flex>
          </FormControl>
        </GridItem>
      </SimpleGrid>

      <Card>
        <UnorderedList spacing={4} styleType="none">
          <ListItem>Item #1</ListItem>
          <ListItem>Item #2</ListItem>
          <ListItem>Item #3</ListItem>
          <ListItem>Item #4</ListItem>
        </UnorderedList>
      </Card>
    </Box>
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {},
  }
}
