import React from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps } from '@reach/router'
import { ImageStack, Details } from 'components'
import { media } from 'utils'

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
    width: 100%;
  }

  ${media.mobile} {
    flex-direction: column;
  }
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
        <ImageStack
          images={[
            {
              src: `${process.env.PUBLIC_URL}/img/1.jpg`,
              alt: 'image 1'
            },
            {
              src: `${process.env.PUBLIC_URL}/img/2.png`,
              alt: 'image 1'
            }
          ]}
        />
      </div>
      <div>
        <DetailsContentWrapper>
          <Details title="Hello World" />
        </DetailsContentWrapper>
      </div>
    </ContentWrapper>
  )
}
