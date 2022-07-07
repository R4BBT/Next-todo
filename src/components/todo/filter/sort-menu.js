import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { BiSortAlt2 } from 'react-icons/bi'
import { useTask } from 'utils/contexts/task-context'

export const SortMenu = () => {
  const { filter, setSortDirection, setSortField } = useTask()

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<BiSortAlt2 />}
        aria-label="Sort Menu"
        variant="ghost"
      />
      <MenuList>
        <MenuOptionGroup defaultValue="desc" title="Order" type="radio">
          <MenuItemOption value="asc" onClick={() => setSortDirection('asc')}>
            Ascending
          </MenuItemOption>
          <MenuItemOption value="desc" onClick={() => setSortDirection('desc')}>
            Descending
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup defaultValue="createdAt" title="Field" type="radio">
          <MenuItemOption
            value="createdAt"
            onClick={() => setSortField('createdAt')}
          >
            Creation Time
          </MenuItemOption>
          <MenuItemOption
            value="important"
            onClick={() => setSortField('important')}
            isDisabled={filter.important}
          >
            Important Tasks
          </MenuItemOption>
          <MenuItemOption
            value="urgent"
            onClick={() => setSortField('urgent')}
            isDisabled={filter.urgent}
          >
            Urgent Tasks
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
