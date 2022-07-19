import {
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { SignUpLoginModal } from 'components/auth'
import { useState } from 'react'
import { IoIosSunny, IoMdMoon } from 'react-icons/io'
import { Illustration } from './illustration'

export function CallToActionWithIllustration() {
  // Color
  const { colorMode, toggleColorMode } = useColorMode()

  // Sign up
  const [signUpMode, setSignUpMode] = useState(false)
  const openSignUpLoginModalInSignUpMode = () => {
    setSignUpMode(true)
    onSignUpLoginModalOpen()
  }
  const openSignUpLoginModalInLoginMode = () => {
    setSignUpMode(false)
    onSignUpLoginModalOpen()
  }
  const {
    isOpen: isSignUpLoginModalOpen,
    onOpen: onSignUpLoginModalOpen,
    onClose: onSignUpLoginModalClose,
  } = useDisclosure()

  return (
    <>
      <SignUpLoginModal
        signUpMode={signUpMode}
        setSignUpMode={setSignUpMode}
        isOpen={isSignUpLoginModalOpen}
        onClose={onSignUpLoginModalClose}
      />
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          // py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Managing todos{' '}
            <Text as={'span'} color={'orange.400'}>
              made easy
            </Text>
            {colorMode === 'light' ? (
              <IconButton
                icon={<IoIosSunny />}
                color="black"
                variant="ghost"
                onClick={toggleColorMode}
                _hover={{ background: 'transparent' }}
                aria-label="Toggle dark mode"
              />
            ) : (
              <IconButton
                icon={<IoMdMoon />}
                color="white"
                variant="ghost"
                onClick={toggleColorMode}
                _hover={{ background: 'transparent' }}
                aria-label="Toggle light mode"
              />
            )}
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Never miss a task. Never forget one either. Keep track of your daily
            todos and sort them by importance or urgency. A demo app made
            by&nbsp;Ryan.
            {/* <Link href="https://www.linkedin.com/in/ryan-fangk/" isExternal>
          Ryan.
          </Link> */}
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
              type="button"
              onClick={openSignUpLoginModalInLoginMode}
            >
              Login
            </Button>
            <Button
              rounded={'full'}
              px={6}
              type="button"
              onClick={openSignUpLoginModalInSignUpMode}
            >
              Sign up
            </Button>
          </Stack>
          <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex>
        </Stack>
      </Container>
    </>
  )
}
