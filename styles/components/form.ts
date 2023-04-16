import styled from 'styled-components'
import { FONT_SIZE_PRIMARY } from '../constants/fontSizes'
import {
  COLOR_BACKGROUND,
  COLOR_MEDIUM,
  COLOR_WARNING,
} from '../constants/colors'
import { BigButton, ColoredButton, CustomButton } from './button'
import { media } from '../utils/commons'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FONT_SIZE_PRIMARY};
`

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 4px 0 2rem;

  flex-direction: column;
  align-items: start;

  ${media.tablet} {
    flex-direction: row;
    align-items: center;
    margin: 4px 0 4px;
  }
`

export const FormRowSeparator = styled.div`
  height: 4rem;
`

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`

export const FormDoubleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`

export const FormRowLabel = styled.label`
  width: 100%;
  margin-bottom: 0.8rem;

  ${media.tablet} {
    margin-bottom: unset;
  }
`

export const FormRowInput = styled.input`
  width: 100%;
  border: 1px solid ${COLOR_BACKGROUND};
  border-radius: 6px;
  height: 3rem;
  padding: 5px;
`

export const FormFlexRow = styled.div`
  display: flex;
`

export const FormButton = styled.button<{ isActive: boolean }>`
  border: none;
  background: none;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  filter: brightness(80%);

  ${(props) =>
    props.isActive &&
    `
    border: 3px solid ${COLOR_MEDIUM};
    padding: 0;
    filter: none;
  `}
`

export const FormSubmitButton = styled(CustomButton)`
  ${ColoredButton};
  ${BigButton};
  margin-top: 2rem;
`

export const FormErrorMessage = styled(FormRow)`
  height: 14px;
  color: ${COLOR_WARNING};
`
