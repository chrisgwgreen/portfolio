import React from 'react'
import styled from 'styled-components/macro'
import { BASE_PATH } from 'utils'
import {
  SideMenuProvider,
  Navigation,
  SideMenuToggle,
  MenuLink
} from 'components'

/*
 * Styled Components
 */
const DashboardMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  outline: none;
`

/*
 * Component
 */

export const DashboardMenu = () => {
  return (
    <SideMenuProvider>
      <div>
        <SideMenuToggle />
        <Navigation>
          <DashboardMenuWrapper>
            <MenuLink to={`${BASE_PATH}/`} isMobileViewport>
              Home
            </MenuLink>
            <MenuLink to={`${BASE_PATH}/project/1`} isMobileViewport>
              Link 1
            </MenuLink>
            <MenuLink to={`${BASE_PATH}/project/2`} isMobileViewport>
              Link 2
            </MenuLink>
            <MenuLink to={`${BASE_PATH}/project/3`} isMobileViewport>
              Link 3
            </MenuLink>
          </DashboardMenuWrapper>
        </Navigation>
      </div>
    </SideMenuProvider>
  )
}
