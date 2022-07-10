import { EditIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import ReactFocusLock from 'react-focus-lock'
import { BsFillEyeFill } from 'react-icons/bs'
import { Form } from './editable-form'

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

  // const randomColorArray = ['teal', 'purple', 'yellow', 'red', 'gray', 'cyan']
  // const randomColor =
  //   randomColorArray[Math.floor(Math.random() * randomColorArray.length)]
  const nonUrgentImportantColor = 'gray'
  const urgentColor = 'orange'
  const importantColor = 'purple'
  const urgentImportantColor = 'red'

  const popoverBackgroundColor = useColorModeValue(
    `${
      urgent
        ? important
          ? urgentImportantColor
          : urgentColor
        : important
        ? importantColor
        : nonUrgentImportantColor
    }.200`,
    `${
      urgent
        ? important
          ? urgentImportantColor
          : urgentColor
        : important
        ? importantColor
        : nonUrgentImportantColor
    }.800`
  )
  const popoverTextColor = useColorModeValue('gray.700', 'gray.200')

  // Main component return statement
  return (
    <>
      <Text textDecoration={status === 'complete' ? 'line-through' : null}>
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
        <PopoverContent
          width="auto"
          px={4}
          py={2}
          bg={popoverBackgroundColor}
          shadow="md"
        >
          {title && (
            <Flex>
              <Text color={popoverTextColor} fontWeight="semibold">
                Title:&nbsp;
              </Text>
              <Text color={popoverTextColor}>{title}</Text>
            </Flex>
          )}
          {description && (
            <Flex>
              <Text color={popoverTextColor} fontWeight="semibold">
                Description:&nbsp;
              </Text>
              <Text color={popoverTextColor}>{description}</Text>
            </Flex>
          )}
          <Flex>
            <Text color={popoverTextColor} fontWeight="semibold">
              Urgent:&nbsp;
            </Text>
            <Text color={popoverTextColor}>{urgent ? 'Yes' : 'No'}</Text>
          </Flex>
          <Flex>
            <Text color={popoverTextColor} fontWeight="semibold">
              Important:&nbsp;
            </Text>
            <Text color={popoverTextColor}>
              Important: {important ? 'Yes' : 'No'}
            </Text>
          </Flex>
        </PopoverContent>
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
            <Form
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
