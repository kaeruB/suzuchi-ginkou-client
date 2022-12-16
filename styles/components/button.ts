import styled, { css } from 'styled-components'
import {
  COLOR_DELICATE_GRAY,
  COLOR_FONT_SECONDARY,
  COLOR_STRONG,
} from '../constants/colors'
import { BORDER_RADIUS } from '../constants/other'

export const CustomButton = styled.button`
  border: none;
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  transition: all 0.3s;

  :disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`

export const ColoredButton = css`
  color: white;
  background: ${COLOR_STRONG};

  :disabled {
    background: ${COLOR_DELICATE_GRAY};
  }
`

export const BigButton = css`
  height: 3.5rem;
`

export const SmallRoundButton = css`
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  border-radius: 50%;
`

export const DelicateButton = css`
  background: none;
  color: ${COLOR_FONT_SECONDARY};
  padding: 0 4px;
`
