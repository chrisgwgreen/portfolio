'use client'

import MenuIcon from '@mui/icons-material/Menu'
import { Drawer } from 'components/Drawer/Drawer'
import { Logo } from 'components/Logo/Logo'
import { Eyes } from 'features/eyes/Eyes'
import { DataContext } from 'features/projects/DataContext'
import { ProjectList } from 'features/projects/ProjectList'
import { SelectedProject } from 'features/projects/SelectedProject'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { Project } from 'types'
import styles from './SiteShell.module.css'

export const SiteShell = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { projects } = useContext(DataContext)
  const router = useRouter()
  const pathname = usePathname()

  // The URL is the source of truth for the open project, so links can be shared
  const slug = pathname.match(/^\/projects\/([^/]+)/)?.[1]
  const selectedProject =
    (slug && Object.values(projects).find(project => project.slug === slug)) ||
    null

  const handleCloseMenu = () => setIsMenuOpen(false)
  const handleCloseContent = () => router.push('/', { scroll: false })
  const handleSelectedProject = (item: Project) =>
    router.push(`/projects/${item.slug}`, { scroll: false })

  const menu = projects
    ? Object.keys(projects).reduce((acc: any, key: any) => {
        const { type } = projects[key]
        return {
          ...acc,
          [type]: [...(acc[type] ? acc[type] : []), projects[key]]
        }
      }, {})
    : {}

  return (
    <>
      <Eyes />
      <Logo />
      <button
        className={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MenuIcon fontSize='medium' />
      </button>
      <Drawer show={isMenuOpen} onClose={handleCloseMenu}>
        <div className={styles.menu}>
          {menu && (
            <ProjectList
              title='Web'
              items={menu['web']}
              handleSelectedProject={handleSelectedProject}
            />
          )}
          {menu && (
            <ProjectList
              title='Hardware'
              items={menu['hardware']}
              handleSelectedProject={handleSelectedProject}
            />
          )}
        </div>
      </Drawer>
      <Drawer show={selectedProject !== null} onClose={handleCloseContent}>
        {selectedProject && (
          <SelectedProject selectedProject={selectedProject} />
        )}
      </Drawer>
    </>
  )
}
