import { Box } from '@chakra-ui/react'
// import { ForgotPasswordModal, LoginModal, SignUpModal } from 'components/auth'

export const Layout = ({ children }) => {
  return (
    <>
      <Box my={10}>{children}</Box>
    </>
  )
}
