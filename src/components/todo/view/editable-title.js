import { EditIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import ReactFocusLock from 'react-focus-lock'
import { BsFillEyeFill } from 'react-icons/bs'
import { PopoverDisplay } from './popover-display'
import { UpdateForm } from './update-form'

// EditableTitle component
export const EditableTitle = ({
  docRef,
  urgent,
  important,
  title,
  status,
  description,
  createdAt,
  updatedAt,
}) => {
  // Initializing
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  // Main component return statement
  return (
    <>
      <Text
        textDecoration={status === 'complete' ? 'line-through' : null}
        noOfLines={1}
      >
        {title}
      </Text>

      <Popover isLazy>
        <PopoverTrigger>
          <IconButton
            size="sm"
            icon={<BsFillEyeFill />}
            variant="ghost"
            opacity="0.2"
          />
        </PopoverTrigger>
        <PopoverDisplay
          title={title}
          description={description}
          urgent={urgent}
          important={important}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      </Popover>

      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            size="sm"
            icon={<EditIcon />}
            variant="ghost"
            opacity="0.2"
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <ReactFocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <UpdateForm
              docRef={docRef}
              firstFieldRef={firstFieldRef}
              onCancel={onClose}
              title={title}
              description={description}
              urgent={urgent}
              important={important}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          </ReactFocusLock>
        </PopoverContent>
      </Popover>
    </>
  )
}
