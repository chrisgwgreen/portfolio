import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components/macro'
import { Theme } from 'themes'

import './index.css'
import App from './App'

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)
