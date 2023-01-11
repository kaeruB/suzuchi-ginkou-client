import { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  COLOR_FONT_PRIMARY,
  COLOR_FONT_SECONDARY,
} from '../../../styles/constants/colors'
import {
  FONT_SIZE_HEADER_PRIMARY,
  FONT_SIZE_HEADER_SECONDARY,
  FONT_SIZE_PRIMARY,
} from '../../../styles/constants/fontSizes'
import {
  FormButton,
  FormColumn,
  FormDoubleColumn,
  FormErrorMessage,
  FormFlexRow,
  FormRow,
  FormRowInput,
  FormRowLabel,
  FormRowSeparator,
  FormSubmitButton,
  FormWrapper,
} from '../../../styles/components/form'
import { PageSizing } from '../../../styles/utils/layout'
import { CustomButton } from '../../../styles/components/button'
import { convertDecimalCodeToHtmlSymbol } from '../../utils/functions/commons'
import {
  ARROW_RIGHT_DEC_CODE,
  SPACE_DEC_CODE,
} from '../../utils/constants/htmlCodes'
import {
  getNameValidationError,
  getPasswordValidationError,
  getRepeatedPasswordValidationError,
  getUserIdValidationError,
  isEmptyString,
} from '../../utils/functions/validators'
import { User } from '../../types/user'
import { DEFAULT_AVATARS, IMG_PATHS } from '../../utils/constants/commons'
import RoundPicture from '../commons/RoundPicture'

interface AuthLayoutProps {
  onSubmit: (body: User) => void
  serverErrorMsg: string | null
  subtitle: 'Login' | 'Signup'
  setFormMode: () => void
  isSignUp: boolean
}

export const AuthLayout: FC<AuthLayoutProps> = (props: AuthLayoutProps) => {
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatedPassword, setRepeatedPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATARS[0])

  const [userIdErrorMsg, setUserIdErrorMsg] = useState<null | string>(null)
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<null | string>(null)
  const [repeatedPasswordErrorMsg, setRepeatedPasswordErrorMsg] = useState<
    null | string
  >(null)
  const [nameErrorMsg, setNameErrorMsg] = useState<null | string>(null)

  useEffect(() => {
    if (props.isSignUp) {
      const passwordError = getPasswordValidationError({ password, userId })
      setPasswordErrorMsg(passwordError)
    }
  }, [password, userId])

  useEffect(() => {
    if (props.isSignUp) {
      const repeatedPasswordError = getRepeatedPasswordValidationError(
        password,
        repeatedPassword,
      )
      setRepeatedPasswordErrorMsg(repeatedPasswordError)
    }
  }, [password, repeatedPassword])

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

  const renderAvatarButton = (avatarName: string) => (
    <FormButton
      onClick={() => setAvatar(avatarName)}
      isActive={avatar === avatarName}
      type={'button'}
      key={avatarName}
    >
      <RoundPicture size={5} src={IMG_PATHS(avatarName)} alt={avatarName} />
    </FormButton>
  )

  const renderAvatarButtons = () =>
    DEFAULT_AVATARS.map((avatarName: string) => renderAvatarButton(avatarName))

  const renderSignUpSpecificFields = () =>
    props.isSignUp && (
      <>
        <FormRow>
          <FormColumn>
            <FormRowLabel>Repeat Password</FormRowLabel>
          </FormColumn>
          <FormDoubleColumn>
            <LoginPageInput
              type="password"
              id="repeatedPassword"
              name="repeatedPassword"
              required
              defaultValue={repeatedPassword}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setRepeatedPassword(e.target.value)
              }
            />
          </FormDoubleColumn>
          <FormErrorMessage>
            {!isEmptyString(repeatedPassword) && repeatedPasswordErrorMsg}
          </FormErrorMessage>
        </FormRow>

        <FormRowSeparator>
          {convertDecimalCodeToHtmlSymbol(SPACE_DEC_CODE)}
        </FormRowSeparator>

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
          <FormErrorMessage>{nameErrorMsg}</FormErrorMessage>
        </FormRow>

        <FormRow>
          <FormColumn>
            <FormRowLabel>Avatar</FormRowLabel>
          </FormColumn>
          <FormDoubleColumn>
            <FormFlexRow>{renderAvatarButtons()}</FormFlexRow>
          </FormDoubleColumn>
          <FormErrorMessage>{nameErrorMsg}</FormErrorMessage>
        </FormRow>
      </>
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
        <FormErrorMessage>{props.serverErrorMsg}</FormErrorMessage>
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
          <FormErrorMessage>{userIdErrorMsg}</FormErrorMessage>
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
          <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
        </FormRow>

        {renderSignUpSpecificFields()}

        <FormSubmitButton
          onClick={() => props.onSubmit(createRequestBody())}
          disabled={
            isEmptyString(userId) ||
            isEmptyString(password) ||
            (props.isSignUp && isEmptyString(repeatedPassword)) ||
            (props.isSignUp && isEmptyString(name)) ||
            userIdErrorMsg !== null ||
            passwordErrorMsg !== null ||
            repeatedPasswordErrorMsg !== null ||
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

const Subtitle = styled(FormRow)`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  color: ${COLOR_FONT_SECONDARY};
  margin-bottom: 3rem;
`

export default AuthLayout
