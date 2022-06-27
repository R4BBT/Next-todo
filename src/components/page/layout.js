// import { ForgotPasswordModal, LoginModal, SignUpModal } from 'components/auth'

import { Container } from '@chakra-ui/react'

export const Layout = ({ children }) => {
  return (
    <>
      <Container py={12} maxWidth="container.xl" height="100%">
        {children}
      </Container>
    </>
  )
}
