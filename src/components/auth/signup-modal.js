import {
  Button,
  Center,
  FormControl,
  FormHelperText,
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
  Stack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from 'utils/contexts/auth-context'
import { useFormReset } from 'utils/hooks'

// TODO: look into formState errors showing
// TODO: Look into redirect to another page

export const SignUpModal = ({ isOpen, onClose }) => {
  // Initialize Modal, Form, Auth
  const { onEmailPasswordSignUp } = useAuth()
  const initialRef = useRef()
  const { loggedIn } = useSelector((state) => state.auth.user)

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

  const signUpFormSubmitHandler = async (data) => {
    onEmailPasswordSignUp(data.email, data.password)
  }

  if (loggedIn) {
    onClose()
    // https://github.com/facebook/react/issues/18178
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(signUpFormSubmitHandler)}
        >
          <ModalHeader>
            <Center>Create your account</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={8} pb={6}>
            <Stack spacing="4">
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
                    name="enteredPassword"
                    pr="4.5rem"
                    type={isPasswordShown ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="new-password"
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
                <FormHelperText>
                  Your password must be 6 characters or longer
                </FormHelperText>
              </FormControl>

              <Button
                isLoading={isSubmitting}
                loadingText="Submitting"
                w="full"
                type="submit"
                variant="solid"
                colorScheme="red"
              >
                Sign Up
              </Button>
            </Stack>
          </ModalBody>
          {/* Is a privacy policy and terms of use redirect necessary? How do we bring the user back to sign up after? */}
          <ModalFooter>
            By signing up you are agreeing to our privacy policy and terms of
            use
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
