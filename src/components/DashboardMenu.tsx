import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { BASE_PATH } from 'utils'
import {
  SideMenuProvider,
  Navigation,
  SideMenuToggle,
  MenuLink
} from 'components'

interface Project {
  title: string
  id: string
}

interface Menu {
  title: string
  projects: Project[]
}

/*
 * Styled Components
 */
const DashboardMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  outline: none;
`

const Partition = styled.span`
  opacity: 0.6;
  text-transform: uppercase;
  font-size: 1.5rem;
  display: block;
  padding: 0.75rem 1rem;
`

/*
 * Component
 */
export const DashboardMenu = () => {
  const [menuContent, setMenuContent] = useState<
    Record<string, unknown>
  >()

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/menu.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((menuContent) => {
        setMenuContent(menuContent)
      })
  }, [])

  const menu =
    menuContent &&
    Object.keys(menuContent).map((value) => {
      const menuItem = menuContent[value] as Menu

      return (
        <div key={`menu-${menuItem.title}`}>
          <Partition>{menuItem.title}</Partition>
          {menuItem.projects.map((project) => {
            const { id, title } = project

            return (
              <MenuLink
                key={`menu-project-${id}`}
                to={`${BASE_PATH}/project/${id}`}
              >
                {title}
              </MenuLink>
            )
          })}
        </div>
      )
    })

  return (
    <SideMenuProvider>
      <div>
        <SideMenuToggle />
        <Navigation>
          <DashboardMenuWrapper>
            <MenuLink to={`${BASE_PATH}/`}>Home</MenuLink>
            {menu}
          </DashboardMenuWrapper>
        </Navigation>
      </div>
    </SideMenuProvider>
  )
}
