import styled from 'styled-components'

export const CustomButton = styled.button`
  width: 100%;
  margin-top: 10rem;
  border: none;
  background: pink;
  height: 3.5rem;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all .3s;
  :disabled {
    // TODO set color, and set in other file
    background: #cdcdcd;
    cursor: not-allowed;
    pointer-events: none;
  }
`