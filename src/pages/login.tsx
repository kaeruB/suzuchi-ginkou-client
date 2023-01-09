import { FC, useState } from 'react'
import { UserCredits } from '../types/user'
import { URL_USER_LOGIN_POST } from '../utils/constants/endpoints'
import { postUser } from '../api/user'
import { RequestResult } from '../types/request'
import LoginSignupPageLayout from '../compositions/login/LoginSignupPageLayout'
import { useAuthContext } from '../context/AuthContextWrapper'
import { SUCCESS } from '../utils/constants/responseStatuses'

interface LoginPageProps {}

// todo implement automatic logout
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

export const LoginPage: FC<LoginPageProps> = (props: LoginPageProps) => {
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
    <LoginSignupPageLayout
      onSubmit={login}
      serverErrorMsg={serverErrorMessage}
      subtitle={'Login'}
      setFormMode={setFormMode}
      isSignUp={isSignUp}
    />
  )
}

export default LoginPage
