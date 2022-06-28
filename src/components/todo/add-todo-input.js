import {
  Button,
  FormControl,
  GridItem,
  IconButton,
  Input,
  SimpleGrid,
  Textarea,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { BsFillExclamationTriangleFill, BsHourglassSplit } from 'react-icons/bs'
import { TbCalendarTime } from 'react-icons/tb'
import { db } from 'utils/configs/firebase-client'
import { useAuth } from 'utils/contexts/auth-context'

export const AddTodoInput = () => {
  // Initialize component
  const toast = useToast()
  const { user } = useAuth()
  const { handleSubmit, register, setError } = useForm()

  // Controller logic
  const userID = user ? user.uid : 'anonymous'
  const tasksCollectionRef = collection(db, 'todos', userID, 'tasks')

  const onAddTaskHandler = async (data) => {
    try {
      const docRef = await addDoc(tasksCollectionRef, {
        title: data.title,
        description: data.description,
        createdAt: serverTimestamp(),
        // important:
        // urgent:
        // dueDate:
        // categories:
      })

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

  const onAddTaskErrorHandler = () => {}

  return (
    <SimpleGrid
      as="form"
      onSubmit={handleSubmit(onAddTaskHandler, onAddTaskErrorHandler)}
      gridColumn={2}
      gridAutoRows="auto"
      width="container.md"
      justifyItems="center"
      gap={3}
    >
      <GridItem width="full">
        <FormControl>
          <Input
            id="title"
            name="title"
            placeholder="New Task Title"
            mr={3}
            color={{ color: useColorModeValue('black', 'white') }}
            _placeholder={{ color: useColorModeValue('black', 'white') }}
            {...register('title', { required: true })}
          />
        </FormControl>
      </GridItem>

      <GridItem width="full">
        <FormControl>
          <Textarea
            id="description"
            name="description"
            placeholder="New Task Description"
            mr={3}
            color={{ color: useColorModeValue('black', 'white') }}
            _placeholder={{ color: useColorModeValue('black', 'white') }}
            {...register('description', { required: false })}
          />
        </FormControl>
      </GridItem>

      <GridItem display="flex" gap={4}>
        <Tooltip label="Important">
          <IconButton
            icon={<BsFillExclamationTriangleFill />}
            variant="outline"
          />
        </Tooltip>
        <Tooltip label="Urgent">
          <IconButton icon={<BsHourglassSplit />} variant="outline" />
        </Tooltip>
        <Tooltip label="Due date">
          <IconButton icon={<TbCalendarTime />} variant="outline" />
        </Tooltip>
      </GridItem>

      <Button type="submit" ml={5} colorScheme="red" width="20rem">
        Add task
      </Button>
    </SimpleGrid>
  )
}
