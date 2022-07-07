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
import { BsExclamationTriangleFill, BsHourglassSplit } from 'react-icons/bs'
import { useTask } from 'utils/contexts/task-context'

export const FilterMenu = () => {
  const { sortField, setFilter } = useTask()

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
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
