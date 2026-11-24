import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { SITE_NAME } from 'utils'

import './globals.css'

export const metadata: Metadata = {
  // Makes relative og:url values absolute in link previews
  metadataBase: new URL(
    process.env.SITE_URL || 'https://gwgreenltd-f6324.web.app'
  ),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: `Web and hardware projects by ${SITE_NAME}`,
  openGraph: { siteName: SITE_NAME, type: 'website', url: '/' },
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
        href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400&display=swap'
      />
    </head>
    <body>
      <div id='root'>{children}</div>
    </body>
  </html>
)

export default RootLayout
