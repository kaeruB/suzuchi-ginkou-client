import { ChangeEvent, FC, useState } from 'react'
import styled from 'styled-components'
import { COLOR_FONT_PRIMARY } from '../../../styles/constants/colors'
import {
  FONT_SIZE_HEADER_PRIMARY,
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

interface LoginPageLayoutProps {
  onSubmit: (body: { username: string; password: string }) => void
}

export const LoginPageLayout: FC<LoginPageLayoutProps> = (
  props: LoginPageLayoutProps,
) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const createRequestBody = () => ({
    username,
    password,
  })

  return (
    <LoginPageWrapper>
      <FormWrapper>
        <FormRow>
          <Logo>Suzuchi Ginkou</Logo>
          {/*  todo logo icon */}
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormRowLabel>User name</FormRowLabel>
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
        </FormRow>

        <FormSubmitButton
          onClick={() => props.onSubmit(createRequestBody())}
          disabled={username === '' || password === ''}
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

const Logo = styled.span`
  font-size: ${FONT_SIZE_HEADER_PRIMARY};
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
`

export default LoginPageLayout
