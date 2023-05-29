import { theme } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '~/assets/react.svg'
import { routePath } from '~/routes/routePath'
import Container from './Container'

const Header = () => {
  const { token } = theme.useToken()
  return (
    <Wrapper className=''>
      <Container className='container'>
        <div className='left'>
          <Link to={routePath.home}>
            <LogoImage src={logo} alt='Logo' />
          </Link>
          <NavLink to={routePath.dashboard} className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
        </div>
        <nav className=''>
          <div className='links'>
            <NavLink to={routePath.login} className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
            <span className=''>/</span>
            <NavLink to={routePath.register} className={({ isActive }) => (isActive ? 'active' : '')}>
              Register
            </NavLink>
          </div>
        </nav>
      </Container>
    </Wrapper>
  )
}

const LogoImage = styled.img``

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  padding: 12px 0;
  background-color: black;
  z-index: 50;
  color: white;

  a {
    &:hover {
      color: ${(p) => p.theme.token.blue5};
      text-decoration: underline;
    }
    &.active {
      color: ${(p) => p.theme.token.blue5};
      text-decoration: underline;
    }
  }

  .left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 50px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .links {
    display: flex;
    align-items: stretch;
    gap: 10px;
    color: white;
  }
`

export default Header
