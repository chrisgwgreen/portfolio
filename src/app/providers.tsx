'use client'

import { ThemeProvider } from '@mui/system'
import { ReactNode } from 'react'
import { muiTheme } from 'themes'

// The MUI theme holds functions, so it has to be created on the client side of the boundary
export const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
)
