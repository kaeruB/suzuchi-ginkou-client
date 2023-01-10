import { VFC } from 'react'
import styled from 'styled-components'
import { COLOR_STRONG } from '../../../../styles/constants/colors'
import { FlexPageLayout, PageSizing } from '../../../../styles/utils/layout'

interface FooterLayoutProps {}

export const FooterLayout: VFC<FooterLayoutProps> = (
  props: FooterLayoutProps,
) => {
  return (
    <FooterWrapper>
      <FooterInside>
        <span>Footer links todo</span>
      </FooterInside>
    </FooterWrapper>
  )
}

export default FooterLayout

const FooterWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${COLOR_STRONG};
  cursor: default;
`
const FooterInside = styled(PageSizing)`
  ${FlexPageLayout};
  height: 3rem;
  align-items: center;
`
