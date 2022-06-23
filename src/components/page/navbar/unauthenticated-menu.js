import { HStack, MenuGroup, MenuItem, Text } from '@chakra-ui/react'
import { HiPencil, HiUser } from 'react-icons/hi'

export const UnauthenticatedMenu = ({ openSignUpModal, openLoginModal }) => {
  return (
    <MenuGroup>
      <MenuItem onClick={openSignUpModal}>
        <HStack>
          <HiPencil />
          <Text>Sign up</Text>
        </HStack>
      </MenuItem>

      <MenuItem onClick={openLoginModal}>
        <HStack>
          <HiUser />
          <Text>Login</Text>
        </HStack>
      </MenuItem>
    </MenuGroup>
  )
}
