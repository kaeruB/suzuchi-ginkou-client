import styled, { css } from 'styled-components'
import { COLOR_BOX_SHADOW } from '../constants/colors'
import { BORDER_RADIUS } from '../constants/other'

export const PageSizing = styled.div`
  max-width: 130rem;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
`

export const FlexPageLayout = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const StyledWidget = styled.div`
  width: 97%;
  box-shadow: 0 0 3px ${COLOR_BOX_SHADOW};
  border-radius: ${BORDER_RADIUS};
  margin: 3rem 0;
  padding: 2rem;
`

export const FlexCentered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
