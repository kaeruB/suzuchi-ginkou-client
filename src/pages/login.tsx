import { useState } from 'react'
import { UserCredits } from '../types/user'
import { URL_USER_LOGIN_POST } from '../utils/constants/endpoints'
import { postUser } from '../api/user'
import { RequestResult } from '../types/request'
import { useAuthContext } from '../context/AuthContextWrapper'
import { SUCCESS } from '../utils/constants/responseStatuses'
import { NextPage } from 'next'
import Auth from '../compositions/auth'

export const LoginPage: NextPage = () => {
  const { setIsAuthenticated, isSignUp, setIsSignUp } = useAuthContext()
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null,
  )

  const login = async (body: UserCredits) => {
    const res: RequestResult = await postUser(URL_USER_LOGIN_POST, body)

    if (res.response?.status === SUCCESS) {
      setIsAuthenticated(true)
    } else if (res.error) {
      setServerErrorMessage(res.error.message)
    }
  }

  const setFormMode = () => setIsSignUp(true)

  return (
    <Auth
      onSubmit={login}
      serverErrorMsg={serverErrorMessage}
      subtitle={'Login'}
      setFormMode={setFormMode}
      isSignUp={isSignUp}
    />
  )
}

export default LoginPage
