import styled from 'styled-components'
import {COLOR_DELICATE_GRAY} from "../constants/colors";

export const CustomButton = styled.button`
  width: 100%;
  border: none;
  background: pink;
  height: 3.5rem;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all .3s;
  :disabled {
    background: ${COLOR_DELICATE_GRAY};
    cursor: not-allowed;
    pointer-events: none;
  }
`