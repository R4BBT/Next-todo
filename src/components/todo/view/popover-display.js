import {
  Flex,
  PopoverContent,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'

export const PopoverDisplay = ({
  title,
  description,
  urgent,
  important,
  createdAt,
  updatedAt,
}) => {
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

  let createdAtTimeStamp
  if (createdAt) {
    const createdAtDateObject = createdAt.toDate()
    createdAtTimeStamp = {
      year: createdAtDateObject.getFullYear(),
      month:
        createdAtDateObject.getMonth() > 8
          ? createdAtDateObject.getMonth() + 1
          : '0' + (createdAtDateObject.getMonth() + 1).toString(),
      date: createdAtDateObject.getDate(),
      hour:
        createdAtDateObject.getHours() > 9
          ? createdAtDateObject.getHours()
          : '0' + createdAtDateObject.getHours().toString(),
      minute:
        createdAtDateObject.getMinutes() > 9
          ? createdAtDateObject.getMinutes()
          : '0' + createdAtDateObject.getMinutes().toString(),
    }
  }

  let updatedAtTimeStamp
  if (updatedAt) {
    const updatedAtDateObject = updatedAt.toDate()
    updatedAtTimeStamp = {
      year: updatedAtDateObject.getFullYear(),
      month:
        updatedAtDateObject.getMonth() > 8
          ? updatedAtDateObject.getMonth() + 1
          : '0' + (updatedAtDateObject.getMonth() + 1).toString(),
      date: updatedAtDateObject.getDate(),
      hour:
        updatedAtDateObject.getHours() > 9
          ? updatedAtDateObject.getHours()
          : '0' + updatedAtDateObject.getHours().toString(),
      minute:
        updatedAtDateObject.getMinutes() > 9
          ? updatedAtDateObject.getMinutes()
          : '0' + updatedAtDateObject.getMinutes().toString(),
    }
  }

  return (
    <PopoverContent
      width="auto"
      px={4}
      py={2}
      bg={popoverBackgroundColor}
      shadow="md"
    >
      {title && (
        <Flex maxWidth="40rem">
          <Text color={popoverTextColor} fontWeight="semibold">
            Title:&nbsp;
          </Text>
          <Text color={popoverTextColor} noOfLines={5}>
            {title}
          </Text>
        </Flex>
      )}
      {description && (
        <Flex maxWidth="40rem">
          <Text color={popoverTextColor} fontWeight="semibold">
            Description:&nbsp;
          </Text>
          <Text color={popoverTextColor} noOfLines={10}>
            {description}
          </Text>
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
        <Text color={popoverTextColor}>{important ? 'Yes' : 'No'}</Text>
      </Flex>
      {createdAt && (
        <Flex>
          <Text color={popoverTextColor} fontWeight="semibold">
            Created At:&nbsp;
          </Text>
          <Tooltip label="Year-Month-Date Hour:Minute">
            <Text
              color={popoverTextColor}
            >{`${createdAtTimeStamp.year}-${createdAtTimeStamp.month}-${createdAtTimeStamp.date} ${createdAtTimeStamp.hour}:${createdAtTimeStamp.minute}`}</Text>
          </Tooltip>
        </Flex>
      )}
      {updatedAt && (
        <Flex>
          <Text color={popoverTextColor} fontWeight="semibold">
            Updated At:&nbsp;
          </Text>
          <Tooltip label="Year-Month-Date Hour:Minute">
            <Text
              color={popoverTextColor}
            >{`${updatedAtTimeStamp.year}-${updatedAtTimeStamp.month}-${updatedAtTimeStamp.date} ${updatedAtTimeStamp.hour}:${updatedAtTimeStamp.minute}`}</Text>
          </Tooltip>
        </Flex>
      )}
    </PopoverContent>
  )
}
