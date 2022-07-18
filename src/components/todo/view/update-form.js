import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Stack,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { serverTimestamp, updateDoc } from 'firebase/firestore'
import { forwardRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillExclamationTriangleFill, BsHourglassSplit } from 'react-icons/bs'
import { TbCalendarTime } from 'react-icons/tb'

// TextInput component
const TextInput = forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  )
})
TextInput.displayName = 'TextInput'

// Form component
export const UpdateForm = ({
  docRef,
  firstFieldRef,
  onCancel,
  title,
  description,
  urgent,
  important,
  createdAt,
  updatedAt,
}) => {
  // Initialize
  const toast = useToast()
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
      createdAt: createdAt,
      updatedAt: updatedAt,
      important: important,
      urgent: urgent,
    },
  })
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [reset, isSubmitSuccessful])

  // Color control
  const inputColor = useColorModeValue('black', 'white')
  const activeColor = useColorModeValue('red', 'salmon')

  // Buttons logic
  const [importantTask, setImportantTask] = useState(important)
  const importantIconClickHandler = () => {
    if (importantTask) {
      setValue('important', false)
      setImportantTask(false)
    } else {
      setValue('important', true)
      setImportantTask(true)
    }
  }
  const [urgentTask, setUrgentTask] = useState(urgent)
  const urgentIconClickHandler = () => {
    if (urgentTask) {
      setValue('urgent', false)
      setUrgentTask(false)
    } else {
      setValue('urgent', true)
      setUrgentTask(true)
    }
  }

  // Title edit handler
  const editableInputSubmitHandler = async (data) => {
    try {
      await updateDoc(docRef, {
        title: data.title,
        description: data.description,
        updatedAt: serverTimestamp(),
        important: data.important,
        urgent: data.urgent,
      })
      onCancel()
      toast({
        status: 'success',
        title: 'A task has been successfully edited',
        description: 'Congratulations!',
        isClosable: true,
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'An error has occured',
        description: `${error.message}`,
        isClosable: true,
      })
    }
  }

  return (
    <Stack
      spacing={4}
      as="form"
      onSubmit={handleSubmit(editableInputSubmitHandler)}
    >
      <TextInput
        label="Title"
        id="popoverTitle"
        name="title"
        ref={firstFieldRef}
        defaultValue={title}
        {...register('title', { required: false })}
      />
      <TextInput
        label="Description"
        name="description"
        id="popoverDescription"
        defaultValue={description}
        {...register('description', { required: false })}
      />
      <HStack>
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
      </HStack>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
