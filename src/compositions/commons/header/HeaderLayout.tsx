import { VFC } from 'react'
import styled from 'styled-components'
import { IconFactory } from '../IconFactory'
import { FlexPageLayout, PageSizing } from '../../../../styles/utils/layout'
import { IconId } from '../../../types/icon'
import { FONT_SIZE_HEADER_TERTIARY } from '../../../../styles/constants/fontSizes'
import {
  CustomButton,
  DelicateButton,
} from '../../../../styles/components/button'
import { COLOR_FONT_SECONDARY } from '../../../../styles/constants/colors'

interface HeaderLayoutProps {
  logOut: () => void
  redirectToSummaryPage: () => void
}

export const HeaderLayout: VFC<HeaderLayoutProps> = (
  props: HeaderLayoutProps,
) => {
  return (
    <HeaderWrapper>
      <HeaderInside>
        <div onClick={props.redirectToSummaryPage}>
          {/* TODO: logo icon */}
          {/*<IconFactory iconId={IconId.LOGO} size={2} />*/}
          Suzuchi Ginkou
        </div>
        <div>
          {/* TODO Currency and logout buttons functionality*/}
          <MenuButton>YEN</MenuButton>
          <MenuButton>PLN</MenuButton>
          <MenuButton onClick={() => props.logOut()}>LOGOUT</MenuButton>
        </div>
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
`
const HeaderInside = styled(PageSizing)`
  ${FlexPageLayout};
  height: 5rem;
  align-items: center;
  color: ${COLOR_FONT_SECONDARY};
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
`

const MenuButton = styled(CustomButton)`
  ${DelicateButton};
`
