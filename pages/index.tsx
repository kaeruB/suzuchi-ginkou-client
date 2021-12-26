import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Dashboard from './Dashboard'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Suzuchi Ginkou</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div id="modal-root" />
      <Dashboard />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
`

export default Home
