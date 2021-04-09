import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Icon, MenuLink, StyledLink } from 'components'
import {
  fadeInAnimation,
  fadeOutAnimation,
  menuOpenAnimation,
  menuCloseAnimation
} from 'utils'

interface Project {
  title: string
  id: string
}

interface MenuProps {
  title: string
  projects: Project[]
}

/*
 * Styled Components
 */
const MenuWrapper = styled.div<{ isMenuClosing: boolean }>(
  (props) => {
    const {
      isMenuClosing,
      theme: { background, headerFont, menuWidth }
    } = props

    return css`
      display: flex;
      flex-direction: column;
      outline: none;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: ${menuWidth}rem;
      background: ${background};
      padding: 2.5rem 1.5rem 0px;
      font-family: ${headerFont};

      ${!isMenuClosing &&
      css`
        animation: ${menuOpenAnimation} 0.4s forwards;
        animation-timing-function: ease;
      `}

      ${isMenuClosing &&
      css`
        animation: ${menuCloseAnimation} 0.4s forwards;
        animation-timing-function: ease;
      `}
    `
  }
)

const MenuCloseWrapper = styled.button((props) => {
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
    outline: none;
    border: none;
    background: none;

    :focus {
      opacity: 0.9;
    }
  `
})

const MenuOpenWrapper = styled.button((props) => {
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
    outline: none;
    border: none;
    background: none;

    :focus {
      opacity: 0.9;
    }
  `
})

const MenuOverlay = styled.div<{ isMenuClosing: boolean }>(
  (props) => {
    const { isMenuClosing = false } = props

    return css`
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(33, 33, 33, 0.2);

      ${!isMenuClosing &&
      css`
        animation: ${fadeInAnimation} 0.4s forwards;
      `}

      ${isMenuClosing &&
      css`
        animation: ${fadeOutAnimation} 0.4s forwards;
      `}
    `
  }
)

const Partition = styled.span`
  opacity: 0.6;
  text-transform: uppercase;
  font-size: 1.5rem;
  display: block;
  padding: 0.75rem 1rem;
`

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

/*
 * Component
 */
export const Menu = () => {
  const [menuContent, setMenuContent] = useState<
    Record<string, unknown>
  >()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)

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

  const handleMenuToggle = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true)
      setIsMenuClosing(false)
    } else {
      setIsMenuClosing(true)

      setTimeout(() => {
        setIsMenuOpen(false)
      }, 400)
    }
  }

  const menu =
    menuContent &&
    Object.keys(menuContent).map((value) => {
      const menuItem = menuContent[value] as MenuProps

      return (
        <div key={`menu-${menuItem.title}`}>
          <Partition>{menuItem.title}</Partition>
          {menuItem.projects.map((project) => {
            const { id, title } = project

            return (
              <StyledLink
                key={`menu-project-${id}`}
                to={`/project/${id}`}
                onClick={handleMenuToggle}
              >
                <MenuLinkWrapper isActive={false}>
                  {title}
                </MenuLinkWrapper>
              </StyledLink>
            )
          })}
        </div>
      )
    })

  return (
    <>
      <MenuOpenWrapper onClick={handleMenuToggle}>
        <Icon icon="bars" />
      </MenuOpenWrapper>
      {isMenuOpen && (
        <MenuOverlay
          onClick={handleMenuToggle}
          isMenuClosing={isMenuClosing}
        />
      )}
      {isMenuOpen && (
        <MenuWrapper isMenuClosing={isMenuClosing}>
          <MenuCloseWrapper onClick={handleMenuToggle}>
            <Icon icon="times" />
          </MenuCloseWrapper>

          <StyledLink to={`/`} onClick={handleMenuToggle}>
            <MenuLinkWrapper isActive={false}>Home</MenuLinkWrapper>
          </StyledLink>

          {menu}
        </MenuWrapper>
      )}
    </>
  )
}
