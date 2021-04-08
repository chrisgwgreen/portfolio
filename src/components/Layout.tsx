import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components/macro'
import { media } from 'utils'

interface Props {
  children: ReactNode
  isColumn?: boolean
}

/*
 * Styled Components
 */
const LayoutWrapper = styled.div<{ isColumn: boolean }>((props) => {
  const {
    theme: { background }
  } = props

  return css`
    width: calc(100% - 6rem);
    height: calc(100% - 9rem);
    margin: 3rem 3rem 0 3rem;
    position: relative;
    background: ${background};
    overflow: hidden;

    ${media.tablet} {
      width: calc(100% - 4rem);
      height: calc(100% - 8rem);
      margin: 2rem 2rem 0 2rem;
    }

    ${media.mobile} {
      width: calc(100% - 2rem);
      height: calc(100% - 7rem);
      margin: 1rem 1rem 0 1rem;
    }
  `
})

/*
 * Component
 */
export const Layout = (props: Props) => {
  const { children, isColumn = true } = props

  return <LayoutWrapper isColumn={isColumn}>{children}</LayoutWrapper>
}
