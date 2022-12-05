import styled, { css } from 'styled-components'
import { COLOR_DELICATE_GRAY, COLOR_STRONG } from '../constants/colors'
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
  width: 100%;
  height: 3.5rem;
`

export const SmallRoundButton = css`
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  border-radius: 50%;
`