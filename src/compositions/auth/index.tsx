import { FC } from 'react'
import { User } from '../../types/user'
import AuthLayout from './AuthLayout'

interface AuthProps {
  onSubmit: (body: User) => void
  serverErrorMsg: string | null
  subtitle: 'Login' | 'Signup'
  setFormMode: () => void
  isSignUp: boolean
}

// todo implement automatic logout
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

export const Auth: FC<AuthProps> = (props: AuthProps) => {
  return (
    <AuthLayout
      onSubmit={props.onSubmit}
      serverErrorMsg={props.serverErrorMsg}
      subtitle={props.subtitle}
      setFormMode={props.setFormMode}
      isSignUp={props.isSignUp}
    />
  )
}

export default Auth
