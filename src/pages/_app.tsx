import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthContextWrapper } from '../context/AuthContextWrapper'

const SuzuchiGinkouClient = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextWrapper>
      <Component {...pageProps} />
    </AuthContextWrapper>
  )
}
export default SuzuchiGinkouClient
