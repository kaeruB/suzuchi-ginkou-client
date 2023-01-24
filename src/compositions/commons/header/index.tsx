import { HeaderLayout } from './HeaderLayout'
import { useAuthContext } from '../../../context/AuthContextWrapper'
import { RequestResult } from '../../../types/request'
import { postUserLogout } from '../../../api/user'
import { URL_USER_LOGOUT_POST } from '../../../utils/constants/endpoints'
import { SUCCESS } from '../../../utils/constants/responseStatuses'
import { usePairContext } from '../../../context/PairContextWrapper'

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const { setIsAuthenticated, isAuthenticated } = useAuthContext()
  const { setPairId } = usePairContext()

  const handleLogOut = async () => {
    const res: RequestResult = await postUserLogout(URL_USER_LOGOUT_POST)

    if (res.response?.status === SUCCESS) {
      setIsAuthenticated(false)
      setPairId(null)
    }
  }

  const redirectToSummaryPage = (): void => {
    if (isAuthenticated) {
      setPairId(null)
    }
  }

  return (
    <HeaderLayout
      logOut={handleLogOut}
      redirectToSummaryPage={redirectToSummaryPage}
    />
  )
}

export default Header
