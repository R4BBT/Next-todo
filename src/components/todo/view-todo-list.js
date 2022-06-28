import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  IconButton,
  ListItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import {
  BsExclamationTriangleFill,
  BsHourglassSplit,
  BsXCircle,
} from 'react-icons/bs'

export const TodoListItem = ({ data }) => {
  const { urgent, important, title } = data

  const ListItemOnClickHandler = () => {}

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

          <Text color="black">{title}</Text>
        </HStack>

        <Box display="flex" justifySelf="end">
          <HStack>
            {important ? (
              <BsExclamationTriangleFill color="red" />
            ) : (
              <BsExclamationTriangleFill />
            )}
            {urgent ? <BsHourglassSplit color="red" /> : <BsHourglassSplit />}
          </HStack>
          <Button mx={2} display="none">
            Update
          </Button>
          <IconButton
            icon={<BsXCircle />}
            variant="ghost"
            aria-label="close button"
            _hover={{ bg: 'transparent', color: 'red' }}
          />
        </Box>
      </SimpleGrid>
    </ListItem>
  )
}
