import React from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps } from '@reach/router'
import { LazyImage } from 'components'

/*
 * Styled Components
 */
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ImageWrapper = styled.div`
  flex: 1;
`

const DetailsWrapper = styled.div`
  flex: 1;
`

/*
 * Component
 */
export const Content = (props: RouteComponentProps) => {
  return (
    <ContentWrapper>
      <ImageWrapper>
        <LazyImage
          src={process.env.PUBLIC_URL + '/img/4.png'}
          alt=""
        />
      </ImageWrapper>
      <DetailsWrapper>CONTENT HERE</DetailsWrapper>
    </ContentWrapper>
  )
}
