import React, { useContext } from 'react'

export const AuthContext = React.createContext({
  loggedIn: false,
  loading: false,
  onEmailPasswordLogin: () => {},
  onGoogleLogin: () => {},
  onLogout: () => {},
  onEmailPasswordSignUp: () => {},
  onConfirmPasswordReset: () => {},
  onPasswordReset: () => {},
  setRedirect: () => {},
  getRedirect: () => {},
  clearRedirect: () => {},
  redirectKey: '',
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const value = {
    // loggedIn,
    // loading,
    // onEmailPasswordLogin,
    // onGoogleLogin,
    // onLogout,
    // onEmailPasswordSignUp,
    // onPasswordReset,
    // onConfirmPasswordReset,
    // setRedirect,
    // getRedirect,
    // clearRedirect,
    // redirectKey,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
