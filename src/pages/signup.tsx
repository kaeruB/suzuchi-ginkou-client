import { useState } from 'react'
import { User, UserDetails } from '../types/user'
import { URL_USER_SIGNUP_POST } from '../utils/constants/endpoints'
import { postUser } from '../api/user'
import { RequestResult } from '../types/request'
import { useAuthContext } from '../context/AuthContextWrapper'
import { SUCCESS } from '../utils/constants/responseStatuses'
import { NextPage } from 'next'
import Auth from '../compositions/auth'

export const SignupPage: NextPage = () => {
  const { setIsAuthenticated, isSignUp, setIsSignUp, setLoggedInUserDetails } =
    useAuthContext()
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null,
  )

  const signup = async (body: User) => {
    const res: RequestResult<{ user: UserDetails }> = await postUser(
      URL_USER_SIGNUP_POST,
      body,
    )

    if (res.response?.status === SUCCESS) {
      setLoggedInUserDetails(res.response.data.user)
      setIsAuthenticated(true)
    } else if (res.error) {
      setLoggedInUserDetails(null)
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
