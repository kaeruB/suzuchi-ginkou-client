import styled, {css} from 'styled-components'
import { COLOR_MEDIUM } from '../constants/colors'
import {BORDER_RADIUS} from "../constants/other";

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
  border: 1px solid ${COLOR_MEDIUM};
  border-radius: ${BORDER_RADIUS};
  margin: 3rem 0;
  padding: 2rem;
`

export const FlexCentered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`