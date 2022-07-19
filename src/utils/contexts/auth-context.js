import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { clientAuth } from 'utils/configs/firebase-client'

export const AuthContext = React.createContext({
  user: {},
  authenticated: false,
  loading: false,
  setLoading: () => {},
  onEmailPasswordLogin: () => {},
  onGoogleLogin: () => {},
  onMicrosoftLogin: () => {},
  onLogout: () => {},
  onEmailPasswordSignUp: () => {},
  companyName: '',
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  // Company name
  const companyName = 'Todo Demo'

  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const toast = useToast()

  useEffect(() => {
    const cookie = new Cookies()
    const unsubscribe = onAuthStateChanged(clientAuth, async (user) => {
      // user is same as <clientAuth className="currentUser"></clientAuth>
      if (user) {
        setLoading(false)
        setAuthenticated(true)
        setUser(user)
        // Check if there is IdToken cookie or if the cookie has been tampered with, if yes reset cookie
        if (
          !cookie.get('idToken') ||
          cookie.get('idToken') !== clientAuth.currentUser.getIdToken()
        ) {
          const accessToken = await clientAuth.currentUser.getIdToken()
          cookie.set('idToken', accessToken, {
            path: '/',
            sameSite: 'strict',
            secure: true,
          })
        }
      } else {
        setLoading(false)
        setAuthenticated(false)
        setUser({})
        cookie.remove('idToken')
      }
    })
    return () => unsubscribe()
  }, [setAuthenticated, setLoading])

  const alreadyLoggedInResponse = ({ description }) => {
    toast({
      status: 'error',
      title: `You're currently signed in`,
      description: `${description}`,
    })
    setLoading(false)
  }

  const onEmailPasswordSignUp = async (email, password) => {
    if (!authenticated) {
      setLoading(true)
      try {
        await createUserWithEmailAndPassword(clientAuth, email, password)
        toast({
          status: 'success',
          title: 'We have successfully created your account',
          description: "You're now being logged into our platform",
          isClosable: true,
        })
      } catch (error) {
        toast({
          status: 'error',
          title: 'We have failed to created your account',
          description: `${error}`,
          isClosable: true,
        })
        setLoading(false)
      }
    } else {
      alreadyLoggedInResponse({
        description: `You cannot sign in while signed in 😔`,
      })
    }
  }

  const onEmailPasswordLogin = async (email, password) => {
    if (!authenticated) {
      setLoading(true)
      try {
        await signInWithEmailAndPassword(clientAuth, email, password)
      } catch (error) {
        toast({
          status: 'error',
          title: 'Please try again',
          description: `${error}`,
          isClosable: true,
        })
        setLoading(false)
      }
    }
  }

  const onGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider()
    if (!authenticated) {
      setLoading(true)
      try {
        await signInWithPopup(clientAuth, googleProvider)
        toast({
          status: 'success',
          title: "You're now logged into our platform",
          description: "You're now authenticated",
          isClosable: true,
        })
      } catch (error) {
        toast({
          status: 'error',
          title: 'We encountered an error with logging you in',
          description: `${error}`,
          isClosable: true,
        })
        setLoading(false)
      }
    } else {
      alreadyLoggedInResponse({
        description: `You cannot sign in while signed in 😔`,
      })
    }
  }

  const onMicrosoftLogin = async () => {
    const microsoftProvider = new OAuthProvider('microsoft.com')
    if (!authenticated) {
      setLoading(true)
      try {
        await signInWithPopup(clientAuth, microsoftProvider)
        toast({
          status: 'success',
          title: "You're now logged into our platform",
          description: "You're now authenticated",
          isClosable: true,
        })
      } catch (error) {
        toast({
          status: 'error',
          title: 'We encountered an error with logging you in',
          description: `${error}`,
          isClosable: true,
        })
        setLoading(false)
      }
    } else {
      alreadyLoggedInResponse({
        description: `You cannot sign in while signed in 😔`,
      })
    }
  }

  const onLogout = async () => {
    if (authenticated) {
      try {
        await signOut(clientAuth)
        toast({
          status: 'success',
          title: 'We hope to see you again soon',
          description: 'You have been successfully logged out',
          isClosable: true,
        })
      } catch (error) {
        toast({
          status: 'error',
          title: 'We encountered an error with signing you out',
          description: `${error}`,
          isClosable: true,
        })
        setLoading(false)
      }
    }
  }

  const value = {
    user,
    loading,
    setLoading,
    authenticated,
    onEmailPasswordLogin,
    onGoogleLogin,
    onMicrosoftLogin,
    onLogout,
    onEmailPasswordSignUp,
    companyName,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
