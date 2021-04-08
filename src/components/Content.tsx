import React from 'react'
import styled, { css } from 'styled-components/macro'

interface Props {
  title: string
}

/*
 * Styled Components
 */
const ContentWrapper = styled.div((props) => {
  const {
    theme: { background }
  } = props

  return css`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${background};
    z-index: 1;
  `
})

/*
 * Component
 */
export const Content = (props: Props) => {
  const { title } = props

  return <ContentWrapper>{title}</ContentWrapper>
}
