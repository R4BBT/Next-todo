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
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillExclamationTriangleFill, BsHourglassSplit } from 'react-icons/bs'
import { TbCalendarTime } from 'react-icons/tb'
import { db } from 'utils/configs/firebase-client'
import { useAuth } from 'utils/contexts/auth-context'

export const AddTodoInput = () => {
  // Initialize component
  const toast = useToast()
  const { authenticated, user } = useAuth()
  const inputColor = useColorModeValue('black', 'white')
  const activeColor = useColorModeValue('red', 'salmon')

  // Buttons logic
  const [importantTask, setImportantTask] = useState(false)
  const [urgentTask, setUrgentTask] = useState(false)
  const importantButtonValueChanger = useCallback(
    (value) => {
      setValue('important', value)
      setImportantTask(value)
    },
    [setValue, setImportantTask]
  )
  const urgentButtonValueChanger = useCallback(
    (value) => {
      setValue('urgent', value)
      setUrgentTask(value)
    },
    [setValue, setUrgentTask]
  )
  const importantIconClickHandler = () => {
    if (importantTask) {
      importantButtonValueChanger(false)
    } else {
      importantButtonValueChanger(true)
    }
  }
  const urgentIconClickHandler = () => {
    if (urgentTask) {
      urgentButtonValueChanger(false)
    } else {
      urgentButtonValueChanger(true)
    }
  }

  // Form Logic
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      createdAt: null,
      important: false,
      urgent: false,
      status: 'incomplete',
    },
  })
  useEffect(() => {
    if (isSubmitSuccessful) {
      importantButtonValueChanger(false)
      urgentButtonValueChanger(false)
      reset()
    }
  }, [
    reset,
    isSubmitSuccessful,
    importantButtonValueChanger,
    urgentButtonValueChanger,
  ])

  // Controller logic
  let userID = authenticated ? user.uid : 'anonymous'

  // For adding pageCounter later on
  // const userDocRef = doc(db, 'todos', userID)

  const tasksCollectionRef = collection(db, 'todos', userID, 'tasks')
  const onAddTaskHandler = async (data) => {
    try {
      // returns const docRef
      await addDoc(tasksCollectionRef, {
        title: data.title,
        description: data.description,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        important: data.important,
        urgent: data.urgent,
        status: 'incomplete',
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
      width="100%"
      maxWidth="container.md"
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
            color={inputColor}
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
            color={inputColor}
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
                color={importantTask ? activeColor : inputColor}
              />
            }
            variant="outline"
            onClick={importantIconClickHandler}
          />
        </Tooltip>
        <Tooltip label="Urgent">
          <IconButton
            icon={
              <BsHourglassSplit color={urgentTask ? activeColor : inputColor} />
            }
            variant="outline"
            onClick={urgentIconClickHandler}
          />
        </Tooltip>
        <Tooltip label="Due date">
          <IconButton icon={<TbCalendarTime />} variant="outline" />
        </Tooltip>
      </GridItem>

      <Button
        type="submit"
        ml={5}
        colorScheme="red"
        width="100%"
        maxWidth="20rem"
      >
        Add task
      </Button>
    </SimpleGrid>
  )
}
