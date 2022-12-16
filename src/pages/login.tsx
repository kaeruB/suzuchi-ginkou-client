import { FC } from 'react'
import { UserCredits } from '../types/user'
import { URL_USER_LOGIN_POST } from '../utils/constants/endpoints'
import { postUserCredits } from '../api/user'
import { RequestResult } from '../types/request'
import LoginPageLayout from '../compositions/login/LoginPageLayout'
import { useAuthContext } from '../context/AuthContextWrapper'

interface LoginPageProps {}

// todo implement automatic logout
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

export const LoginPage: FC<LoginPageProps> = (props: LoginPageProps) => {
  const { setIsAuthenticated } = useAuthContext()

  const login = async (body: UserCredits) => {
    const url = URL_USER_LOGIN_POST
    const res: RequestResult = await postUserCredits(url, body)

    if (res.response?.status === 'success') {
      // todo: send request to remove session on backend side
      setIsAuthenticated(true)
    }
  }

  return <LoginPageLayout onSubmit={login} />
}

export default LoginPage
