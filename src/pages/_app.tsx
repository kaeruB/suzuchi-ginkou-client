import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthContextWrapper } from '../context/AuthContextWrapper'
import { PairContextWrapper } from '../context/PairContextWrapper'

const SuzuchiGinkouClient = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextWrapper>
      <PairContextWrapper>
        <Component {...pageProps} />
      </PairContextWrapper>
    </AuthContextWrapper>
  )
}
export default SuzuchiGinkouClient
