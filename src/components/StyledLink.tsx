import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { Icon, IconName } from 'components'

interface Props {
  to: string
  children: ReactNode | string
  asButton?: boolean
  icon?: IconName
  isBlock?: boolean
  onClick?: () => void
}

/*
 * Styled Components
 */
const StyledLinkWrapper = styled((props) => {
  const linkProps = { ...props }

  delete linkProps.asButton
  delete linkProps.isBlock
  delete linkProps.isHoverOpacityDisabled

  return <NavLink {...linkProps} />
})((props) => {
  const {
    theme: {
      color,
      gradientToColor,
      gradientFromColor,
      boxShadow,
      borderRadius
    },
    asButton,
    isBlock
  } = props

  return css`
    color: ${color};
    fill: ${color};
    text-decoration: none;
    cursor: pointer;

    div {
      margin-right: 0.5rem;
    }

    ${asButton &&
    css`
      display: flex;
      color: ${color};
      background: ${gradientToColor};
      background-image: linear-gradient(
        145deg,
        ${gradientToColor} 0%,
        ${gradientFromColor} 100%
      );

      border-radius: ${borderRadius}rem;
      padding: 0.5rem 1rem;
      box-shadow: ${boxShadow};
      justify-content: center;
      font-size: 0.8125rem;
      text-transform: uppercase;
      opacity: 1;
    `}

    ${isBlock &&
    css`
      width: 100%;
    `}
  `
})

/*
 * Component
 */
export const StyledLink = (props: Props) => {
  const {
    to,
    children,
    asButton = false,
    icon,
    onClick,
    isBlock = false
  } = props

  /*
   * Event Handlers
   */
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <StyledLinkWrapper
      to={to}
      onClick={handleClick}
      asButton={asButton}
      isBlock={isBlock}
    >
      {icon && <Icon icon={icon} isShadow />}
      {children}
    </StyledLinkWrapper>
  )
}
