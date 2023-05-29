import { theme } from 'antd'
import { FC, ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
interface ThemeProviderProps {
  children: ReactNode
}
const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { token } = theme.useToken()

  return (
    <StyledThemeProvider
      theme={{
        token,
      }}
    >
      {children}
    </StyledThemeProvider>
  )
}

export default ThemeProvider
