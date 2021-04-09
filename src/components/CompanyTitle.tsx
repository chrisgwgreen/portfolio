import React from 'react'
import styled, { css } from 'styled-components/macro'
import { RouteComponentProps, Link } from '@reach/router'

/*
 * Styled Components
 */
const CompanyTitleWrapper = styled.h1((props) => {
  const {
    theme: { headerFont, color }
  } = props

  return css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;
    font-family: ${headerFont};
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: normal;
    color: ${color};
  `
})

/*
 * Component
 */
export const CompanyTitle = (props: RouteComponentProps) => {
  return (
    <Link to={`/`}>
      <CompanyTitleWrapper>GWGreen Ltd.</CompanyTitleWrapper>
    </Link>
  )
}
