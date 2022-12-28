import { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  COLOR_FONT_PRIMARY,
  COLOR_FONT_SECONDARY,
  COLOR_WARNING,
} from '../../../styles/constants/colors'
import {
  FONT_SIZE_HEADER_PRIMARY,
  FONT_SIZE_HEADER_SECONDARY,
  FONT_SIZE_PRIMARY,
} from '../../../styles/constants/fontSizes'
import {
  FormColumn,
  FormDoubleColumn,
  FormRow,
  FormRowInput,
  FormRowLabel,
  FormSubmitButton,
  FormWrapper,
} from '../../../styles/components/form'
import { PageSizing } from '../../../styles/utils/layout'
import { CustomButton } from '../../../styles/components/button'
import { convertDecimalCodeToHtmlSymbol } from '../../utils/functions/commons'
import { ARROW_RIGHT_DEC_CODE } from '../../utils/constants/htmlCodes'
import {
  getPasswordValidationError,
  getUsernameValidationError,
  isEmptyString,
} from '../../utils/functions/validators'

interface LoginSignupPageLayoutProps {
  onSubmit: (body: { username: string; password: string }) => void
  serverErrorMsg: string | null
  subtitle: 'Login' | 'Signup'
  setFormMode: () => void
  isSignUp: boolean
}

export const LoginSignupPageLayout: FC<LoginSignupPageLayoutProps> = (
  props: LoginSignupPageLayoutProps,
) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [usernameErrorMsg, setUsernameErrorMsg] = useState<null | string>(null)
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<null | string>(null)

  useEffect(() => {
    if (props.isSignUp) {
      const passwordError = getPasswordValidationError({ password, username })
      setPasswordErrorMsg(passwordError)
    }
  }, [password, username])

  useEffect(() => {
    if (props.isSignUp) {
      const usernameError = getUsernameValidationError(username)
      setUsernameErrorMsg(usernameError)
    }
  }, [username])

  const createRequestBody = () => ({
    username,
    password,
  })

  return (
    <LoginPageWrapper>
      <FormWrapper>
        <FormHeaderRow>
          <Logo>Suzuchi Ginkou</Logo>
          {/*  todo logo icon */}
          <LoginSignUpSwitchButton onClick={props.setFormMode}>
            {props.isSignUp ? 'Login ' : 'Signup '}
            {convertDecimalCodeToHtmlSymbol(ARROW_RIGHT_DEC_CODE)}
          </LoginSignUpSwitchButton>
        </FormHeaderRow>
        <Subtitle>{props.subtitle}</Subtitle>
        <ErrorMessage>{props.serverErrorMsg}</ErrorMessage>
        <FormRow>
          <FormColumn>
            <FormRowLabel>Username</FormRowLabel>
          </FormColumn>
          <FormDoubleColumn>
            <LoginPageInput
              type="text"
              id="username"
              autoComplete="username"
              name="username"
              required
              defaultValue={username}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </FormDoubleColumn>
          <ErrorMessage>{usernameErrorMsg}</ErrorMessage>
        </FormRow>

        <FormRow>
          <FormColumn>
            <FormRowLabel>Password</FormRowLabel>
          </FormColumn>
          <FormDoubleColumn>
            <LoginPageInput
              type="password"
              id="password"
              autoComplete="password"
              name="password"
              required
              defaultValue={password}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </FormDoubleColumn>
          <ErrorMessage>{passwordErrorMsg}</ErrorMessage>
        </FormRow>

        <FormSubmitButton
          onClick={() => props.onSubmit(createRequestBody())}
          disabled={
            isEmptyString(username) ||
            isEmptyString(password) ||
            usernameErrorMsg !== null ||
            passwordErrorMsg !== null
          }
        >
          Submit
        </FormSubmitButton>
      </FormWrapper>
    </LoginPageWrapper>
  )
}

const LoginPageWrapper = styled(PageSizing)`
  max-width: 50rem;
  margin-top: 20vh;
  font-family: 'Poppins', sans-serif;
  font-size: ${FONT_SIZE_PRIMARY};
  color: ${COLOR_FONT_PRIMARY};
`

const LoginPageInput = styled(FormRowInput)`
  border: 1px solid gray;
`

const FormHeaderRow = styled(FormRow)`
  display: flex;
  justify-content: space-between;
`

const LoginSignUpSwitchButton = styled(CustomButton)`
  width: 6rem;
  background: none;
  display: flex;
  justify-content: center;
  color: ${COLOR_FONT_PRIMARY};
`

const Logo = styled.span`
  font-size: ${FONT_SIZE_HEADER_PRIMARY};
  display: flex;
  justify-content: center;
`

const ErrorMessage = styled(FormRow)`
  height: 8px;
  color: ${COLOR_WARNING};
`

const Subtitle = styled(FormRow)`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  color: ${COLOR_FONT_SECONDARY};
  margin-bottom: 3rem;
`

export default LoginSignupPageLayout
