import {
  HStack,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { GoGear } from 'react-icons/go'
import { VscSignOut } from 'react-icons/vsc'
import { useAuth } from 'utils/contexts/auth-context'

export const AuthenticatedMenu = () => {
  const { onLogout } = useAuth()

  const logoutHandler = () => {
    onLogout()
  }

  return (
    <>
      <MenuGroup>
        <Link href="/account" passHref>
          <MenuItem>
            <HStack>
              <GoGear />
              <Text>Account</Text>
            </HStack>
          </MenuItem>
        </Link>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem onClick={logoutHandler}>
          <HStack>
            <VscSignOut />
            <Text>Signout</Text>
          </HStack>
        </MenuItem>
      </MenuGroup>
    </>
  )
}
