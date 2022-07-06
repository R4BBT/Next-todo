import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  IconButton,
  ListItem,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { deleteDoc, doc } from 'firebase/firestore'
import {
  BsExclamationTriangleFill,
  BsHourglassSplit,
  BsXCircle,
} from 'react-icons/bs'
import { clientAuth, db } from 'utils/configs/firebase-client'

export const TodoListItem = ({ id, data }) => {
  const { urgent, important, title } = data
  const toast = useToast()
  let userID = clientAuth.currentUser ? clientAuth.currentUser.uid : 'anonymous'

  const docRef = doc(db, `todos/${userID}/tasks/${id}`)

  const ListItemOnClickHandler = () => {}

  // This is currently a hard delete, but will be looking into soft delete by changing status of task to deleted and offer restore options for 30 days
  const onDeleteHandler = async () => {
    try {
      await deleteDoc(docRef)
      toast({
        status: 'success',
        title: 'Task deleted',
        description: 'A task has been successfully deleted',
        isClosable: true,
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Task could not be deleted',
        description: 'A task has not been deleted',
        isClosable: true,
      })
    }
  }

  return (
    <ListItem
      onClick={ListItemOnClickHandler}
      // textDecoration="line-through"
    >
      <SimpleGrid columns={2} row={1} alignItems="center">
        <HStack alignItems="center">
          <IconButton
            variant="ghost"
            aria-label="close button"
            _hover={{ bg: 'transparent', color: 'green' }}
            icon={<CheckCircleIcon />}
          />

          <Text color={useColorModeValue('black', 'white')}>{title}</Text>
        </HStack>

        <Box display="flex" justifySelf="end">
          <HStack>
            {important ? (
              <BsExclamationTriangleFill
                color={useColorModeValue('red', 'salmon')}
              />
            ) : (
              <BsExclamationTriangleFill />
            )}
            {urgent ? (
              <BsHourglassSplit color={useColorModeValue('red', 'salmon')} />
            ) : (
              <BsHourglassSplit />
            )}
          </HStack>

          <Button mx={2} display="none">
            Update
          </Button>

          <IconButton
            icon={<BsXCircle />}
            variant="ghost"
            aria-label="delete button"
            _hover={{ bg: 'transparent', color: 'red' }}
            onClick={onDeleteHandler}
          />
        </Box>
      </SimpleGrid>
    </ListItem>
  )
}
