import { createContext, useContext, useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'
import {
  LOGIN_PATH,
  SIGNUP_PATH,
  PAIRS_PATH,
} from '../utils/constants/routerPaths'

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  isSignUp: false,
  setIsSignUp: (isSignUp: boolean) => {},
})

interface AuthContextWrapperProps {
  children: any
}

export const AuthContextWrapper: VFC<AuthContextWrapperProps> = (
  props: AuthContextWrapperProps,
) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuthenticated) {
      if (isSignUp) {
        router.push(SIGNUP_PATH)
      } else {
        router.push(LOGIN_PATH)
      }
    } else {
      router.push(PAIRS_PATH)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      if (isSignUp) {
        router.push(SIGNUP_PATH)
      } else {
        router.push(LOGIN_PATH)
      }
    }
  }, [isSignUp])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isSignUp, setIsSignUp }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
