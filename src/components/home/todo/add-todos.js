import {
  Button,
  Container,
  Flex,
  FormControl,
  GridItem,
  Input,
  InputGroup,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { addDoc, collection } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { db } from 'utils/configs/firebase-client'

export const AddTodos = ({ ...rest }) => {
  const toast = useToast()
  const { handleSubmit, register, setError } = useForm()

  const onAddTaskErrorHandler = () => {}

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

  return (
    <GridItem
      as="form"
      onSubmit={handleSubmit(onAddTaskHandler, onAddTaskErrorHandler)}
      pt={5}
      {...rest}
    >
      <Container maxWidth="container.xl">
        <FormControl>
          <Flex>
            <InputGroup>
              <Input
                id="title"
                name="title"
                placeholder="New Task"
                mr={3}
                color="white"
                _placeholder={{ color: useColorModeValue('black', 'white') }}
                {...register('title', { required: true })}
              />
            </InputGroup>
            <Button type="submit">Add</Button>
          </Flex>
        </FormControl>
      </Container>
    </GridItem>
  )
}
