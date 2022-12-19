import { VFC } from 'react'
import { HeaderLayout } from './HeaderLayout'
import { useAuthContext } from '../../../context/AuthContextWrapper'
import { RequestResult } from '../../../types/request'
import { postUserLogout } from '../../../api/user'
import { URL_USER_LOGOUT_POST } from '../../../utils/constants/endpoints'
import { SUCCESS } from '../../../utils/constants/responseStatuses'

interface HeaderProps {}

export const Header: VFC<HeaderProps> = (props: HeaderProps) => {
  const { setIsAuthenticated } = useAuthContext()

  const handleLogOut = async () => {
    const res: RequestResult = await postUserLogout(URL_USER_LOGOUT_POST)

    if (res.response?.status === SUCCESS) {
      setIsAuthenticated(false)
    }
  }

  return <HeaderLayout logOut={handleLogOut} />
}

export default Header
