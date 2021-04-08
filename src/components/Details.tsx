import React from 'react'
import styled, { css } from 'styled-components/macro'

interface Props {
  title: string
}

/*
 * Styled Components
 */
const DetailsWrapper = styled.div((props) => {
  const {
    theme: { copyFont }
  } = props

  return css`
    display: flex;
    flex-direction: column;
    font-family: ${copyFont};
  `
})

const DetailsTitle = styled.h3((props) => {
  const {
    theme: { largeHeaderFont, color }
  } = props

  return css`
    font-family: ${largeHeaderFont};
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 3rem;
    color: ${color};
  `
})

const DetailsCopy = styled.p((props) => {
  const {
    theme: { copyFont, color }
  } = props

  return css`
    font-family: ${copyFont};

    text-transform: uppercase;
    font-size: 1rem;
    color: ${color};
  `
})

/*
 * Component
 */
export const Details = (props: Props) => {
  const { title } = props

  return (
    <DetailsWrapper>
      <DetailsTitle>{title}</DetailsTitle>
      <DetailsCopy>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Maecenas semper nisl vitae lacinia suscipit. Maecenas at risus
        urna. Nunc eget congue tortor.
      </DetailsCopy>
    </DetailsWrapper>
  )
}
