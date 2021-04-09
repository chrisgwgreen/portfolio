import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useParams } from 'react-router-dom'
import { ImageStack, Details } from 'components'
import { media, fadeInAnimation } from 'utils'
import { ContentProps } from 'types'

interface Props {
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
  opacity: 0;
  animation: ${fadeInAnimation} 0.4s forwards;

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
export const Content = () => {
  const { projectId } = useParams<Props>()

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
          images={content?.images?.map((image) => {
            return {
              src: `${process.env.PUBLIC_URL}/img/${image}`,
              alt: 'image 1'
            }
          })}
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
