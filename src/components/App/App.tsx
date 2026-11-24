'use client'

import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/system'
import { Drawer, Eyes, Logo, ProjectList, SelectedProject } from 'components'
import { DataContext } from 'contexts'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { Project } from 'types'

const MenuWrapper = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: 0.25rem solid #333333;
  color: #333333;
  background: #fff;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0.2rem 1rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 2;
`

const SwipeListWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`

export const App = () => {
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
      <MenuWrapper onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MenuIcon fontSize='medium' />
      </MenuWrapper>
      <Drawer show={isMenuOpen} onClose={handleCloseMenu}>
        <SwipeListWrapper>
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
        </SwipeListWrapper>
      </Drawer>
      <Drawer show={selectedProject !== null} onClose={handleCloseContent}>
        {selectedProject && (
          <SelectedProject selectedProject={selectedProject} />
        )}
      </Drawer>
    </>
  )
}
