import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  LOGIN_PATH,
  SIGNUP_PATH,
  PAIRS_PATH,
} from '../utils/constants/routerPaths'
import { UserDetails } from '../types/user'

interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  isSignUp: boolean
  setIsSignUp: (isSignUp: boolean) => void
  loggedInUserDetails: UserDetails | null
  setLoggedInUserDetails: (loggedInUserDetails: UserDetails | null) => void
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  isSignUp: false,
  setIsSignUp: (isSignUp: boolean) => {},
  loggedInUserDetails: null,
  setLoggedInUserDetails: (loggedInUserDetails: UserDetails | null) => {},
})

interface AuthContextWrapperProps {
  children: any
}

export const AuthContextWrapper = (props: AuthContextWrapperProps) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const [loggedInUserDetails, setLoggedInUserDetails] =
    useState<UserDetails | null>(null)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const saveRetrieveUserDetailsToStore = (): void => {
    const USER_DETAILS_STORAGE_KEY = 'userDetails'
    if (loggedInUserDetails) {
      localStorage.setItem(
        USER_DETAILS_STORAGE_KEY,
        JSON.stringify(loggedInUserDetails),
      )
    } else {
      const savedUserDetails: string | null = localStorage.getItem(
        USER_DETAILS_STORAGE_KEY,
      )
      if (savedUserDetails) {
        const userDetails: UserDetails = JSON.parse(savedUserDetails)
        setLoggedInUserDetails(userDetails)
      }
    }
  }

  useEffect(() => {
    saveRetrieveUserDetailsToStore()
  }, [loggedInUserDetails])

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
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isSignUp,
        setIsSignUp,
        loggedInUserDetails,
        setLoggedInUserDetails,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
