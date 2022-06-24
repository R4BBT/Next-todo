import { Box } from '@chakra-ui/react'
// import { ForgotPasswordModal, LoginModal, SignUpModal } from 'components/auth'

export const Layout = ({ children }) => {
  return (
    <>
      <Box pr={10} maxWidth="full" height="100%">
        {children}
      </Box>
    </>
  )
}
