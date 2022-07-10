import { Button, Divider, GridItem } from '@chakra-ui/react'
import { useState } from 'react'
import { AddTodoInput } from './add-todo-input'

export const AddTodos = ({ ...rest }) => {
  const [showTodo, setShowTodo] = useState(false)

  const showTodoInputHandler = () => {
    setShowTodo((prevState) => !prevState)
  }

  return (
    <GridItem
      pt={5}
      {...rest}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flexWrap="wrap"
    >
      <Button
        mb={5}
        width="100%"
        maxWidth="40rem"
        onClick={showTodoInputHandler}
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
      >
        {showTodo ? 'Close Input' : 'Add Task'}
      </Button>
      {showTodo ? <AddTodoInput /> : null}
      <Divider my={5} />
    </GridItem>
  )
}
