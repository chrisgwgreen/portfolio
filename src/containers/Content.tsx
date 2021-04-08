import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps } from '@reach/router'
import { ImageStack, Details } from 'components'
import { media } from 'utils'
import { ContentProps } from 'types'

interface Props extends RouteComponentProps {
  projectId?: string
}

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
export const Content = (props: Props) => {
  const { projectId } = props

  const [content, setContent] = useState<ContentProps>()

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/${projectId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((projectContent) => {
        setContent(projectContent)
      })
  }, [projectId])

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
          {content && content.title && (
            <Details title={content.title} />
          )}
        </DetailsContentWrapper>
      </div>
    </ContentWrapper>
  )
}
