import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { FaRegListAlt } from 'react-icons/fa'

export const SortMenu = () => {
  return (
    <Menu isLazy>
      <MenuButton fontWeight="semibold">View</MenuButton>
      <MenuList>
        <MenuItem>
          <HStack>
            <FaRegListAlt />
            <Text>List</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
