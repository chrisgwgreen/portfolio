import { DataProvider } from 'features/projects/DataContext'
import { getProjects } from 'lib/projects'
import { ReactNode } from 'react'
import { SiteShell } from './_components/SiteShell'

// Shared by / and /projects/[slug] so the eyes and drawers persist between them;
// the SiteShell reads the URL to decide which project is open
const SiteLayout = async ({ children }: { children: ReactNode }) => {
  const projects = await getProjects()

  return (
    <DataProvider projects={projects}>
      <SiteShell />
      {children}
    </DataProvider>
  )
}

export default SiteLayout
