import React from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps } from '@reach/router'
import { LazyImage, Details } from 'components'

/*
 * Styled Components
 */
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;

  > div {
    flex: 1;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
`

const DetailsContentWrapper = styled.div`
  margin: 2rem;
`

/*
 * Component
 */
export const Content = (props: RouteComponentProps) => {
  return (
    <ContentWrapper>
      <div>
        <ImageWrapper>
          <LazyImage
            src={process.env.PUBLIC_URL + '/img/4.png'}
            alt=""
          />
        </ImageWrapper>
      </div>
      <div>
        <DetailsContentWrapper>
          <Details title="Hello World" />
        </DetailsContentWrapper>
      </div>
    </ContentWrapper>
  )
}
