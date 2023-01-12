import { VFC } from 'react'
import styled from 'styled-components'
import { IconFactory } from '../IconFactory'
import {FlexCentered, FlexPageLayout, PageSizing} from '../../../../styles/utils/layout'
import { IconId } from '../../../types/icon'
import { FONT_SIZE_HEADER_TERTIARY } from '../../../../styles/constants/fontSizes'
import {
  CustomButton,
  DelicateButton,
} from '../../../../styles/components/button'
import {
  COLOR_BACKGROUND,
  COLOR_FONT_SECONDARY,
} from '../../../../styles/constants/colors'
import { useAuthContext } from '../../../context/AuthContextWrapper'
import { IMG_PATHS } from '../../../utils/constants/commons'
import RoundPicture from '../RoundPicture'

interface HeaderLayoutProps {
  logOut: () => void
  redirectToSummaryPage: () => void
}

export const HeaderLayout: VFC<HeaderLayoutProps> = (
  props: HeaderLayoutProps,
) => {
  const { loggedInUserDetails } = useAuthContext()

  const renderLoggedInUser = () =>
    loggedInUserDetails && (
      <UserDetails>
        <RoundPicture
          size={3}
          src={IMG_PATHS(loggedInUserDetails.avatar)}
          alt={loggedInUserDetails.name}
        />
        <span>{loggedInUserDetails.name}</span>
      </UserDetails>
    )

  return (
    <HeaderWrapper>
      <HeaderInside>
        <Logo onClick={props.redirectToSummaryPage}>
          {/* TODO: logo icon */}
          {/*<IconFactory iconId={IconId.LOGO} size={2} />*/}
          Suzuchi Ginkou
        </Logo>
        <RightPanel>
          {renderLoggedInUser()}

          {/* TODO Currency and logout buttons functionality*/}
          {/*<MenuButton>YEN</MenuButton>*/}
          {/*<MenuButton>PLN</MenuButton>*/}
          <MenuButton onClick={() => props.logOut()}>LOGOUT</MenuButton>
        </RightPanel>
      </HeaderInside>
    </HeaderWrapper>
  )
}

export default HeaderLayout

const HeaderWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  cursor: default;
  z-index: 1;
  background: ${COLOR_BACKGROUND};
`
const HeaderInside = styled(PageSizing)`
  ${FlexPageLayout};
  height: 5rem;
  align-items: center;
  color: ${COLOR_FONT_SECONDARY};
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
`

const Logo = styled.div`
  cursor: pointer;
`

const MenuButton = styled(CustomButton)`
  ${DelicateButton};
`

const RightPanel = styled.div`
  ${FlexCentered};
`

const UserDetails = styled.div`
  ${FlexCentered};
  margin-right: 2rem;
`
