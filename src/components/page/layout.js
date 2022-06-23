import { Container } from '@chakra-ui/react'
// import { ForgotPasswordModal, LoginModal, SignUpModal } from 'components/auth'

export const Layout = ({ children }) => {
  return (
    <>
      <Container my={16} maxWidth="container.xl">
        {children}
      </Container>
    </>
  )
}
