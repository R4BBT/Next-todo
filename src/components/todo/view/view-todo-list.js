import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  IconButton,
  ListItem,
  SimpleGrid,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import {
  BsExclamationTriangleFill,
  BsHourglassSplit,
  BsXCircle,
} from 'react-icons/bs'
import { db } from 'utils/configs/firebase-client'
import { useAuth } from 'utils/contexts/auth-context'
import { EditableTitle } from './editable-title'

export const TodoListItem = ({ id, data }) => {
  const { urgent, important, title, status } = data
  const toast = useToast()
  const activeColor = useColorModeValue('red', 'salmon')
  const { authenticated, user } = useAuth()

  let userID = authenticated ? user.uid : 'anonymous'
  const docRef = doc(db, `todos/${userID}/tasks/${id}`)

  // Updating the document status to complete
  const listItemOnClickHandler = () => {
    if (status === 'incomplete') {
      updateDoc(docRef, {
        status: 'complete',
        updatedAt: serverTimestamp(),
      })
    } else {
      updateDoc(docRef, {
        status: 'incomplete',
        updatedAt: serverTimestamp(),
      })
    }
  }

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
    // onClick={ListItemOnClickHandler}
    // textDecoration="line-through"
    >
      <SimpleGrid columns={2} row={1} alignItems="center">
        <HStack alignItems="center">
          <IconButton
            variant="ghost"
            aria-label="Mark as complete"
            _hover={{ bg: 'transparent', color: 'green' }}
            icon={<CheckCircleIcon />}
            onClick={listItemOnClickHandler}
          />
          <EditableTitle title={title} status={status} docRef={docRef} />
          {/* <Text
            color={useColorModeValue('black', 'white')}
            decoration={status === 'complete' ? 'line-through' : null}
          >
            {title}
          </Text> */}
        </HStack>

        <Box display="flex" justifySelf="end">
          <HStack>
            {important ? (
              <BsExclamationTriangleFill color={activeColor} />
            ) : (
              <BsExclamationTriangleFill />
            )}
            {urgent ? (
              <BsHourglassSplit color={activeColor} />
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
