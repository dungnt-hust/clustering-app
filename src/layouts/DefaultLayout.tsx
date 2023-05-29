import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import Footer from './components/Footer'
import Header from './components/Header'

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <main className='main'>{children}</main>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  & > main {
    flex: 1;
  }
`

export default DefaultLayout
