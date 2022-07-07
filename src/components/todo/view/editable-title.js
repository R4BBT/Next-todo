import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  useEditableControls,
  useToast,
} from '@chakra-ui/react'
import { updateDoc } from 'firebase/firestore'
import { useRef } from 'react'

export const EditableTitle = ({ title, status, docRef }) => {
  const titleRef = useRef()
  const toast = useToast()

  const editableInputSubmitHandler = async () => {
    try {
      await updateDoc(docRef, { title: titleRef.current.value })
    } catch (error) {
      toast({
        status: 'error',
        title: 'An error has occured',
        description: `${error.message}`,
        isClosable: true,
      })
    }
  }

  // Controls component
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" alignItems="center" ml={3}>
        <IconButton
          icon={<CheckIcon />}
          type="submit"
          {...getSubmitButtonProps()}
          variant="ghost"
        />
        <IconButton
          icon={<CloseIcon />}
          type="button"
          {...getCancelButtonProps()}
          variant="ghost"
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="sm"
          type="button"
          icon={<EditIcon />}
          variant="ghost"
          {...getEditButtonProps()}
          opacity="0.2"
        />
      </Flex>
    )
  }

  return (
    <Editable
      defaultValue={title}
      onSubmit={editableInputSubmitHandler}
      submitOnBlur={false}
      isPreviewFocusable={false}
    >
      <Flex>
        <EditablePreview
          as={Text}
          color={useColorModeValue('black', 'white')}
          decoration={status === 'complete' ? 'line-through' : null}
        />
        {/* <EditableInput /> */}
        <Input as={EditableInput} type="text" ref={titleRef} />
        <EditableControls />
      </Flex>
    </Editable>
  )
}
