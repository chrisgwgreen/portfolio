import { ThemeProvider } from '@mui/system'
import { App } from 'components'
import { DataProvider } from 'contexts'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { muiTheme } from 'themes'

import 'assets/index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const element = document.getElementById('root')
const root = ReactDOM.createRoot(element!)

const Root = () => {
  return (
    <StrictMode>
      <DataProvider>
        <ThemeProvider theme={muiTheme}>
          <App />
        </ThemeProvider>
      </DataProvider>
    </StrictMode>
  )
}

root.render(<Root />)
