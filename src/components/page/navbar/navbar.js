import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Protect, SignUpLoginModal } from 'components/auth'
import Link from 'next/link'
import { useState } from 'react'
import { IconContext } from 'react-icons'
import { FiChevronDown } from 'react-icons/fi'
import { IoIosSunny, IoMdMoon } from 'react-icons/io'
import { MdDashboardCustomize } from 'react-icons/md'
import { clientAuth } from 'utils/configs/firebase-client'
import { useAuth } from 'utils/contexts/auth-context'
import { AuthenticatedMenu } from './authenticated-menu'
import { UnauthenticatedMenu } from './unauthenticated-menu'

// TODO: Add src to Avatar

export const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.900')
  // const { isOpen, onOpen, onClose } = useDisclosure() //isOpen, onOpen, onClose
  const { colorMode, toggleColorMode } = useColorMode()
  const { authenticated, companyName } = useAuth()

  const name = clientAuth.currentUser?.displayName
  const userPhoto = clientAuth.currentUser?.photoURL
  const accountType = null

  const [signUpMode, setSignUpMode] = useState(false)

  const {
    isOpen: isSignUpLoginModalOpen,
    onOpen: onSignUpLoginModalOpen,
    onClose: onSignUpLoginModalClose,
  } = useDisclosure()

  const openSignUpLoginModalInSignUpMode = () => {
    setSignUpMode(true)
    onSignUpLoginModalOpen()
  }

  const openSignUpLoginModalInLoginMode = () => {
    setSignUpMode(false)
    onSignUpLoginModalOpen()
  }

  return (
    <Protect>
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <SignUpLoginModal
          signUpMode={signUpMode}
          setSignUpMode={setSignUpMode}
          isOpen={isSignUpLoginModalOpen}
          onClose={onSignUpLoginModalClose}
        />

        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems="center"
          bg={bg}
          w="full"
          px={{ base: 2, sm: 4 }}
          py={4}
          shadow="md"
        >
          <GridItem w="100%"></GridItem>

          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link href="/" passHref>
              <Heading
                size="md"
                as="h1"
                aria-label={companyName}
                color="orange"
                _hover={{
                  // textShadow: '1px 1px 1px',
                  cursor: 'pointer',
                }}
              >
                {companyName}
              </Heading>
            </Link>
          </GridItem>

          <GridItem w="100%">
            <Flex spacing={3} justifyContent="flex-end" alignItems="center">
              <Box display={{ base: 'none', md: 'flex' }}>
                <Tooltip
                  shouldWrapChildren
                  closeOnClick
                  isDisabled={authenticated}
                  label="This is a member feature"
                  mt={3}
                  hasArrow
                  arrowSize={15}
                  aria-label="This is a member feature"
                >
                  <Link href="/dashboard" passHref>
                    <IconButton
                      icon={<MdDashboardCustomize />}
                      variant="ghost"
                      _hover={{ bg: 'lightblue' }}
                      aria-label="Dashboard"
                      disabled={!authenticated}
                    />
                  </Link>
                </Tooltip>

                {colorMode === 'light' ? (
                  <IconButton
                    icon={<IoIosSunny />}
                    color="black"
                    variant="ghost"
                    onClick={toggleColorMode}
                    aria-label="Toggle dark mode"
                  />
                ) : (
                  <IconButton
                    icon={<IoMdMoon />}
                    color="white"
                    variant="ghost"
                    onClick={toggleColorMode}
                    aria-label="Toggle light mode"
                  />
                )}
              </Box>

              <Menu>
                <MenuButton
                  // py={2} // Do not use Py this causes an issue with scroll and popper
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}
                >
                  <Flex ml={3} alignItems="center">
                    <Avatar
                      name={name}
                      size={'sm'}
                      src={userPhoto}
                      bg="gray.400"
                    />
                    <VStack
                      alignItems="flex-start"
                      spacing="1px"
                      ml={2}
                      display={{ base: 'none', md: 'flex' }}
                    >
                      <Text fontSize="sm">{name ? name : 'Username'}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {accountType || 'Standard'}
                      </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }} ml={2}>
                      <FiChevronDown />
                    </Box>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <IconContext.Provider value={{ size: '1rem' }}>
                    {authenticated ? (
                      <AuthenticatedMenu />
                    ) : (
                      <UnauthenticatedMenu
                        openSignUpModal={openSignUpLoginModalInSignUpMode}
                        openLoginModal={openSignUpLoginModalInLoginMode}
                      />
                    )}
                  </IconContext.Provider>
                </MenuList>
              </Menu>
            </Flex>
          </GridItem>
        </Grid>
      </IconContext.Provider>
    </Protect>
  )
}
