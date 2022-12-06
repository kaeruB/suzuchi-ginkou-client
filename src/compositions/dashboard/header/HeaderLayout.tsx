import { VFC } from 'react'
import styled from 'styled-components'
import { COLOR_STRONG, COLOR_WHITE } from '../../../../styles/constants/colors'
import { IconFactory } from '../../commons/IconFactory'
import { FlexPageLayout, PageSizing } from '../../../../styles/utils/layout'
import { IconId } from '../../../types/icon'
import { FONT_SIZE_HEADER_TERTIARY } from '../../../../styles/constants/fontSizes'

interface HeaderLayoutProps {}

export const HeaderLayout: VFC<HeaderLayoutProps> = (
  props: HeaderLayoutProps,
) => {
  return (
    <HeaderWrapper>
      <HeaderInside>
        <LeftPanel>
          {/* TODO: logo icon */}
          {/*<IconFactory iconId={IconId.LOGO} size={2} />*/}
          Suzuchi Ginkou
        </LeftPanel>
        <RightPanel>
          {/* TODO Currency and logout buttons functionality*/}
          YEN PLN Logout
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
  background: ${COLOR_STRONG};
  cursor: default;
  z-index: 1;
`
const HeaderInside = styled(PageSizing)`
  ${FlexPageLayout};
  height: 5rem;
  align-items: center;
  color: ${COLOR_WHITE};
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
`

const LeftPanel = styled.div``
const RightPanel = styled.div``
