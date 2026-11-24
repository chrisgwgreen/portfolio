import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'

import './globals.css'

export const metadata: Metadata = {
  title: 'GWGreen Ltd.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <head>
      {/* Applies site-wide: the App Router layout wraps every page */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap'
      />
    </head>
    <body>
      <AppRouterCacheProvider>
        <Providers>
          <div id='root'>{children}</div>
        </Providers>
      </AppRouterCacheProvider>
    </body>
  </html>
)

export default RootLayout
