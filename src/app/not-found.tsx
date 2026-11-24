import { NotFound } from 'features/not-found/NotFound'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found'
}

// Exported as 404.html, which Firebase Hosting serves for any unknown URL
const NotFoundPage = () => <NotFound />

export default NotFoundPage
