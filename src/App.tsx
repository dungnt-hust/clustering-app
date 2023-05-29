import ThemeProvider from './app/ThemeProvider'
import GlobalStyle from './assets/styles/GlobalStyles'
import BrowserRouter from './routes/BrowserRouter'

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <BrowserRouter />
    </ThemeProvider>
  )
}

export default App
