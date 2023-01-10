import { useState } from 'react'
import { User } from '../types/user'
import { URL_USER_SIGNUP_POST } from '../utils/constants/endpoints'
import { postUser } from '../api/user'
import { RequestResult } from '../types/request'
import { useAuthContext } from '../context/AuthContextWrapper'
import { SUCCESS } from '../utils/constants/responseStatuses'
import { NextPage } from 'next'
import Auth from '../compositions/auth'

export const SignupPage: NextPage = () => {
  const { setIsAuthenticated, isSignUp, setIsSignUp } = useAuthContext()
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null,
  )

  const signup = async (body: User) => {
    const res: RequestResult = await postUser(URL_USER_SIGNUP_POST, body)

    if (res.response?.status === SUCCESS) {
      setIsAuthenticated(true)
    } else if (res.error) {
      setServerErrorMessage(res.error.message)
    }
  }

  const setFormMode = () => setIsSignUp(false)

  return (
    <Auth
      onSubmit={signup}
      serverErrorMsg={serverErrorMessage}
      subtitle={'Signup'}
      setFormMode={setFormMode}
      isSignUp={isSignUp}
    />
  )
}

export default SignupPage
