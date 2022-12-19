import { FC, useState } from 'react'
import { UserCredits } from '../types/user'
import { URL_USER_SIGNUP_POST } from '../utils/constants/endpoints'
import { postUserCredits } from '../api/user'
import { RequestResult } from '../types/request'
import { useAuthContext } from '../context/AuthContextWrapper'
import LoginPageLayout from '../compositions/login/LoginPageLayout'
import { SUCCESS } from '../utils/constants/responseStatuses'

interface SignupPageProps {}

export const SignupPage: FC<SignupPageProps> = (props: SignupPageProps) => {
  const { setIsAuthenticated, isSignUp, setIsSignUp } = useAuthContext()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signup = async (body: UserCredits) => {
    const res: RequestResult = await postUserCredits(URL_USER_SIGNUP_POST, body)

    if (res.response?.status === SUCCESS) {
      setIsAuthenticated(true)
    } else if (res.error) {
      setErrorMessage(res.error.message)
    }
  }

  const setFormMode = () => setIsSignUp(false)

  return (
    <LoginPageLayout
      onSubmit={signup}
      errorMessage={errorMessage}
      subtitle={'Signup'}
      setFormMode={setFormMode}
      isSignUp={isSignUp}
    />
  )
}

export default SignupPage
