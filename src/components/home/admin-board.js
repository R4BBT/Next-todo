import { GridItem, Image, Text } from '@chakra-ui/react'
import { useAuth } from 'utils/contexts/auth-context'

export const AdminBoard = ({ ...rest }) => {
  const { user } = useAuth()

  return (
    <GridItem
      {...rest}
      bg="gray.700"
      display="flex"
      direction="column"
      flexWrap="wrap"
      justifyContent="center"
      alignContent="start"
      shadow="md"
    >
      <Text
        as="h1"
        fontSize="3xl"
        textAlign="start"
        flexGrow={1}
        width="full"
        color="white"
        mb={6}
      >
        Welcome, {user ? user.displayName : 'Anonymous'}
      </Text>
      {/* <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        // shadow="lg"
        borderWidth="1px"
        width="full"
        bg="white"
        flexGrow={1}
      > */}
      <Image
        src={user.photoURL}
        borderRadius="full"
        boxSize="150px"
        alt="User Profile Picture"
        fallbackSrc="/cat.jpg"
        alignSelf="start"
      />
      {/* </Box> */}
    </GridItem>
  )
}
