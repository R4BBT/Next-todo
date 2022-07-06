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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillExclamationTriangleFill, BsHourglassSplit } from 'react-icons/bs'
import { TbCalendarTime } from 'react-icons/tb'
import { clientAuth, db } from 'utils/configs/firebase-client'

export const AddTodoInput = () => {
  // Initialize component
  const toast = useToast()
  const { handleSubmit, register, setError, setValue } = useForm({
    defaultValues: {
      important: false,
    },
  })

  // Button logic
  const [importantTask, setImportantTask] = useState(false)
  const importantIconClickHandler = () => {
    if (importantTask) {
      setValue('important', false)
      setImportantTask(false)
    } else {
      setValue('important', true)
      setImportantTask(true)
    }
  }

  const [urgentTask, setUrgentTask] = useState(false)
  const urgentIconClickHandler = () => {
    if (urgentTask) {
      setValue('urgent', false)
      setUrgentTask(false)
    } else {
      setValue('urgent', true)
      setUrgentTask(true)
    }
  }

  // Controller logic
  let userID = clientAuth.currentUser ? clientAuth.currentUser.uid : 'anonymous'

  const tasksCollectionRef = collection(db, 'todos', userID, 'tasks')
  const onAddTaskHandler = async (data) => {
    console.log(data)
    try {
      const docRef = await addDoc(tasksCollectionRef, {
        title: data.title,
        description: data.description,
        createdAt: serverTimestamp(),
        important: data.important,
        urgent: data.urgent,
        // status: 'onboard' || 'In progress' || 'completed' || 'deleted' || 'Pending deletion'
        // actionDate:
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
            // _placeholder={{ color: useColorModeValue('gray.400', 'gray.50') }}
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
            // _placeholder={{ color: useColorModeValue('gray.400', 'gray.50') }}
            {...register('description', { required: false })}
          />
        </FormControl>
      </GridItem>

      <GridItem display="flex" gap={4}>
        <Tooltip label="Important">
          <IconButton
            icon={
              <BsFillExclamationTriangleFill
                color={
                  importantTask
                    ? useColorModeValue('red', 'salmon')
                    : useColorModeValue('black', 'white')
                }
              />
            }
            variant="outline"
            onClick={importantIconClickHandler}
          />
        </Tooltip>
        <Tooltip label="Urgent">
          <IconButton
            icon={
              <BsHourglassSplit
                color={
                  urgentTask
                    ? useColorModeValue('red', 'salmon')
                    : useColorModeValue('black', 'white')
                }
              />
            }
            variant="outline"
            onClick={urgentIconClickHandler}
          />
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
