import { App } from 'components/App/App'
import { DataProvider } from 'contexts'
import { getProjects } from 'lib/projects'
import { ReactNode } from 'react'

// Shared by / and /projects/[slug] so the eyes and drawers persist between them;
// the App reads the URL to decide which project is open
const SiteLayout = async ({ children }: { children: ReactNode }) => {
  const projects = await getProjects()

  return (
    <DataProvider projects={projects}>
      <App />
      {children}
    </DataProvider>
  )
}

export default SiteLayout
