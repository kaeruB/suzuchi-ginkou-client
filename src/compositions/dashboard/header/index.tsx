import { VFC } from 'react'
import { HeaderLayout } from './HeaderLayout'
import { useAuthContext } from '../../../context/AuthContextWrapper'

interface HeaderProps {}

export const Header: VFC<HeaderProps> = (props: HeaderProps) => {
  const { setIsAuthenticated } = useAuthContext()
  const handleLogOut = () => setIsAuthenticated(false)

  return <HeaderLayout logOut={handleLogOut} />
}

export default Header
