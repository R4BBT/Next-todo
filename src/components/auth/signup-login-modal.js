import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { GoogleLoginButton } from 'components/auth'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from 'utils/contexts/auth-context'
import { useFormReset } from 'utils/hooks'
import { MicrosoftLoginButton } from './microsoft-login'

export const SignUpLoginModal = ({
  isOpen,
  onClose,
  // onForgotPasswordOpen,
  signUpMode,
  setSignUpMode,
}) => {
  // Initialize auth functions, user state, and form ref
  const { authenticated, onEmailPasswordSignUp, onEmailPasswordLogin } =
    useAuth()
  const initialRef = useRef()
  const toast = useToast()
  const showToast = () => {
    toast({
      status: 'info',
      title: 'Good luck!',
      description: 'This feature is not available here',
    })
  }

  // For controlling password visibility
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const passwordVisibilityHandler = () => {
    setIsPasswordShown((currentValue) => !currentValue)
  }

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const { ref, ...rest } = register('email', { required: true })
  useFormReset()

  const formSubmitHandler = async (data) => {
    signUpMode
      ? onEmailPasswordSignUp(data.email, data.password)
      : onEmailPasswordLogin(data.email, data.password)
  }

  useEffect(() => {
    if (authenticated) {
      onClose()
    }
  }, [authenticated, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          {signUpMode ? (
            <Center>Create your account</Center>
          ) : (
            <Center>Login</Center>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={8} pb={6}>
          <SimpleGrid
            columns={1}
            pb={4}
            spacing={4}
            as="form"
            onSubmit={handleSubmit(formSubmitHandler)}
            borderBottom="solid 1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                name="enteredEmail"
                placeholder="Email"
                autoComplete="email"
                {...rest}
                ref={(e) => {
                  ref(e)
                  initialRef.current = e
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  name="password"
                  pr="4.5rem"
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete={
                    signUpMode ? 'new-password' : 'current-password'
                  }
                  {...register('password', {
                    required: true,
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={passwordVisibilityHandler}
                  >
                    {isPasswordShown ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              py={2}
              isLoading={isSubmitting}
              loadingText="Submitting"
              w="full"
              type="submit"
              variant="solid"
              colorScheme="red"
            >
              {signUpMode ? 'SignUp' : 'Login'}
            </Button>

            {/* <Flex justify="center">
              <Checkbox colorScheme="green" defaultChecked size="sm">
                Remember Me?
              </Checkbox>
            </Flex> */}

            <Flex justify={signUpMode ? 'center' : 'space-between'}>
              <Button
                fontSize="sm"
                textAlign="center"
                color={useColorModeValue('black', 'white')}
                fontWeight="normal"
                variant="link"
                onClick={() => {
                  setSignUpMode((prevState) => !prevState)
                }}
              >
                {signUpMode ? 'Already have an account?' : 'Create an account'}
              </Button>

              <Button
                fontSize="sm"
                textAlign="center"
                color={useColorModeValue('black', 'white')}
                fontWeight="normal"
                variant="link"
                onClick={showToast}
                display={signUpMode ? 'none' : 'block'}
              >
                Forgot password?
              </Button>
            </Flex>
          </SimpleGrid>

          <GoogleLoginButton width="full" px={0} pt={4} />
          <MicrosoftLoginButton width="full" px={0} pt={4} />
        </ModalBody>
        <ModalFooter pt={0} mt={0} textAlign="center" justifyContent="center">
          You are agreeing to all the risks of using this platform
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
