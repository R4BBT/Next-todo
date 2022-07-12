import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react'
import { BiFilter } from 'react-icons/bi'
import {
  BsEmojiSunglasses,
  BsExclamationTriangleFill,
  BsHourglassSplit,
} from 'react-icons/bs'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

import { useTask } from 'utils/contexts/task-context'

export const FilterMenu = () => {
  const { sortField, filter, setFilter } = useTask()

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={IconButton} icon={<BiFilter />} variant="ghost" />
      <MenuList>
        <MenuOptionGroup title="Filtering Criteria" type="checkbox">
          <MenuItemOption
            value="important"
            onClick={() =>
              setFilter((prevState) => ({
                ...prevState,
                important: !prevState.important,
              }))
            }
            isDisabled={sortField === 'important'}
          >
            <HStack>
              <BsExclamationTriangleFill />
              <Text>Important</Text>
            </HStack>
          </MenuItemOption>

          <MenuItemOption
            value="urgent"
            onClick={() =>
              setFilter((prevState) => ({
                ...prevState,
                urgent: !prevState.urgent,
              }))
            }
            isDisabled={sortField === 'urgent'}
          >
            <HStack>
              <BsHourglassSplit />
              <Text>Urgent</Text>
            </HStack>
          </MenuItemOption>

          <MenuItemOption
            value="complete"
            onClick={() =>
              setFilter((prevState) => ({
                ...prevState,
                complete: !prevState.complete,
              }))
            }
            isDisabled={filter.all === true}
          >
            <HStack>
              <IoCheckmarkDoneOutline />
              <Text>Completed</Text>
            </HStack>
          </MenuItemOption>

          <MenuItemOption
            value="all"
            isDisabled={filter.complete === true}
            onClick={() =>
              setFilter((prevState) => ({
                ...prevState,
                all: !prevState.all,
              }))
            }
          >
            <HStack>
              <BsEmojiSunglasses />
              <Text>All Tasks</Text>
            </HStack>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
