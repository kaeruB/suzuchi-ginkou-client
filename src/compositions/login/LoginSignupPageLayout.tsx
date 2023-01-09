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
  getNameValidationError,
  getPasswordValidationError,
  getUserIdValidationError,
  isEmptyString,
} from '../../utils/functions/validators'
import { User } from '../../types/user'

interface LoginSignupPageLayoutProps {
  onSubmit: (body: User) => void
  serverErrorMsg: string | null
  subtitle: 'Login' | 'Signup'
  setFormMode: () => void
  isSignUp: boolean
}

export const LoginSignupPageLayout: FC<LoginSignupPageLayoutProps> = (
  props: LoginSignupPageLayoutProps,
) => {
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')

  const [userIdErrorMsg, setUserIdErrorMsg] = useState<null | string>(null)
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<null | string>(null)
  const [nameErrorMsg, setNameErrorMsg] = useState<null | string>(null)

  useEffect(() => {
    if (props.isSignUp) {
      const passwordError = getPasswordValidationError({ password, userId })
      setPasswordErrorMsg(passwordError)
    }
  }, [password, userId])

  useEffect(() => {
    if (props.isSignUp) {
      const userIdError = getUserIdValidationError(userId)
      setUserIdErrorMsg(userIdError)
    }
  }, [userId])

  useEffect(() => {
    if (props.isSignUp) {
      const nameError = getNameValidationError(name)
      setNameErrorMsg(nameError)
    }
  }, [name])

  const createRequestBody = (): User => ({
    userId,
    password,
    name,
    avatar,
  })

  const renderSignUpSpecificFields = () =>
    props.isSignUp && (
      <FormRow>
        <FormColumn>
          <FormRowLabel>Name</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
          <LoginPageInput
            type="text"
            id="name"
            autoComplete="name"
            name="name"
            required
            defaultValue={name}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </FormDoubleColumn>
        <ErrorMessage>{nameErrorMsg}</ErrorMessage>
      </FormRow>
    )

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
            <FormRowLabel>User ID</FormRowLabel>
          </FormColumn>
          <FormDoubleColumn>
            <LoginPageInput
              type="text"
              id="userId"
              autoComplete="userId"
              name="userId"
              required
              defaultValue={userId}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value)
              }
            />
          </FormDoubleColumn>
          <ErrorMessage>{userIdErrorMsg}</ErrorMessage>
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

        {renderSignUpSpecificFields()}

        <FormSubmitButton
          onClick={() => props.onSubmit(createRequestBody())}
          disabled={
            isEmptyString(userId) ||
            isEmptyString(password) ||
            (props.isSignUp && isEmptyString(name)) ||
            userIdErrorMsg !== null ||
            passwordErrorMsg !== null ||
            nameErrorMsg !== null
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
