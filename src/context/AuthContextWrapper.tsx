import { createContext, useContext, useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
})

interface AuthContextWrapperProps {
  children: any
}

export const AuthContextWrapper: VFC<AuthContextWrapperProps> = (
  props: AuthContextWrapperProps,
) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    } else {
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
