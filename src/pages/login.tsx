import { FC, useState } from 'react'
import { UserCredits } from '../types/user'
import { URL_USER_LOGIN_POST } from '../utils/constants/endpoints'
import { postUserCredits } from '../api/user'
import { RequestResult } from '../types/request'
import LoginPageLayout from '../compositions/login/LoginPageLayout'
import { useAuthContext } from '../context/AuthContextWrapper'
import { SUCCESS } from '../utils/constants/responseStatuses'

interface LoginPageProps {}

// todo implement automatic logout
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

export const LoginPage: FC<LoginPageProps> = (props: LoginPageProps) => {
  const { setIsAuthenticated, isSignUp, setIsSignUp } = useAuthContext()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const login = async (body: UserCredits) => {
    const res: RequestResult = await postUserCredits(URL_USER_LOGIN_POST, body)

    if (res.response?.status === SUCCESS) {
      setIsAuthenticated(true)
    } else if (res.error) {
      setErrorMessage(res.error.message)
    }
  }

  const setFormMode = () => setIsSignUp(true)

  return (
    <LoginPageLayout
      onSubmit={login}
      errorMessage={errorMessage}
      subtitle={'Login'}
      setFormMode={setFormMode}
      isSignUp={isSignUp}
    />
  )
}

export default LoginPage