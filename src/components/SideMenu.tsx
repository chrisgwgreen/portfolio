import React, { useState, useContext, ReactNode } from 'react'
import styled, { css } from 'styled-components/macro'
import { slide as Menu, State } from 'react-burger-menu'
import { Icon, StyledLink } from 'components'

interface Props {
  children: ReactNode
}

interface MenuLinkProps {
  to: string
  children: ReactNode | string
}

/*
 * Styled Components
 */
const SideMenuToggleWrapper = styled.div((props) => {
  const {
    theme: { color }
  } = props

  return css`
    position: absolute;
    fill: ${color};
    right: 0;
    top: 0;
    padding: 1rem;
    cursor: pointer;
    z-index: 1;
  `
})

const SideMenuCloseWrapper = styled.div((props) => {
  const {
    theme: { color }
  } = props

  return css`
    position: absolute;
    fill: ${color};
    right: 0;
    top: 0;
    padding: 1rem;
    cursor: pointer;
  `
})

const SideMenuWrapper = styled.div((props) => {
  const {
    theme: { color, background, headerFont }
  } = props

  return css`
    fill: ${color};
    font-family: axiformathin;
    font-family: montserratregular;

    .bm-menu {
      background: ${background};
      padding: 2.5rem 1.5rem 0;
    }

    .bm-overlay,
    .bm-menu-wrap {
      top: 0;
      left: 0;
    }
  `
})

const MenuLinkWrapper = styled.div<{ isActive: boolean }>((props) => {
  const {
    isActive,
    theme: { color, polygonBackground }
  } = props

  return css`
    box-sizing: content-box;
    position: relative;
    transition: opacity 0.4s;
    text-transform: uppercase;
    font-size: 0.8125rem;
    padding: 0.75rem 1rem;
    transition: background 0.4s;
    display: flex;
    border-bottom: 1px solid transparent;

    :hover {
      border-bottom: 1px solid ${color};
    }

    ${isActive &&
    css`
      border-bottom: 1px solid ${polygonBackground};
    `}
  `
})

export const MenuItem = styled(StyledLink)``

/*
 * Component
 */
export const MenuLink = (props: MenuLinkProps) => {
  const { to, children } = props

  const sideMenuContext = useContext(SideMenuContext)

  /*
   * Event Handlers
   */
  const handleMenuLinkClick = () =>
    sideMenuContext.stateChangeHandler &&
    sideMenuContext.stateChangeHandler({
      isOpen: false
    })

  // return (
  //   <Match path={to}>
  //     {({ match }) => (
  //       <StyledLink
  //         to={to}
  //         onClick={handleMenuLinkClick}
  //         isHoverOpacityDisabled={!!match}
  //       >
  //         <MenuLinkWrapper isActive={!!match}>
  //           {children}
  //         </MenuLinkWrapper>
  //       </StyledLink>
  //     )}
  //   </Match>
  // )

  return (
    <StyledLink to={to} onClick={handleMenuLinkClick}>
      <MenuLinkWrapper isActive={false}>{children}</MenuLinkWrapper>
    </StyledLink>
  )
}

export const SideMenuContext = React.createContext<{
  isMenuOpen: boolean
  toggleMenu?: () => void
  stateChangeHandler?: (state: State) => void
}>({
  isMenuOpen: false
})

export const SideMenuProvider = (props: Props) => {
  const [menuOpenState, setMenuOpenState] = useState(false)

  return (
    <SideMenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState: State) =>
          setMenuOpenState(newState.isOpen)
      }}
    >
      {props.children}
    </SideMenuContext.Provider>
  )
}

export const SideMenuToggle = () => {
  const sideMenuContext = useContext(SideMenuContext)

  return (
    <SideMenuToggleWrapper onClick={sideMenuContext.toggleMenu}>
      <Icon icon="bars" />
    </SideMenuToggleWrapper>
  )
}

export const SideMenuClose = () => {
  const sideMenuContext = useContext(SideMenuContext)

  return (
    <SideMenuCloseWrapper onClick={sideMenuContext.toggleMenu}>
      <Icon icon="times" />
    </SideMenuCloseWrapper>
  )
}

export const Navigation = (props: Props) => {
  const { children } = props
  const sideMenuContext = useContext(SideMenuContext)
  const { stateChangeHandler } = sideMenuContext

  const styles = {
    bmMenuWrap: {
      position: 'absolute',
      height: '100%'
    },
    bmOverlay: {
      position: 'absolute',
      height: '100%',
      background: 'rgba(33, 33, 33, 0.2)'
    }
  }

  return (
    <SideMenuWrapper>
      <Menu
        customCrossIcon={<SideMenuClose />}
        customBurgerIcon={false}
        isOpen={sideMenuContext.isMenuOpen}
        onStateChange={(state) =>
          stateChangeHandler && stateChangeHandler(state)
        }
        styles={styles}
      >
        {children}
      </Menu>
    </SideMenuWrapper>
  )
}
