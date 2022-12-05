import { VFC } from 'react'
import { HeaderLayout } from './HeaderLayout'

interface HeaderProps {}

export const Header: VFC<HeaderProps> = (props: HeaderProps) => {
  return <HeaderLayout />
}

export default Header
