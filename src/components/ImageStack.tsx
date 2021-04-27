import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { LazyImage } from 'components'
import {
  fadeInAnimation,
  fadeOutAnimation,
  IMAGE_STACK_DELAY
} from 'utils'

interface ImageProps {
  src: string
  alt: string
}

interface Props {
  images?: ImageProps[]
}

/*
 * Styled Components
 */
const ImageStackWrapper = styled.div((props) => {
  const {
    theme: { boxShadow }
  } = props

  return css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: 0;
    animation: ${fadeInAnimation} 0.4s forwards;

    box-shadow: ${boxShadow};
  `
})

const ThumbnailWrapper = styled.div<{
  isSelected: boolean
  wasSelected: boolean
}>((props) => {
  const { isSelected, wasSelected } = props

  return css`
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 100%;

    ${isSelected &&
    css`
      animation: ${fadeInAnimation} ${IMAGE_STACK_DELAY}s forwards;
      pointer-events: initial;
    `}

    ${wasSelected &&
    css`
      animation: ${fadeOutAnimation} ${IMAGE_STACK_DELAY}s forwards;
    `}
  `
})

/*
 * Component
 */
export const ImageStack = (props: Props) => {
  const { images } = props

  const [thumbnailIndex, setthumbnailIndex] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (images && images.length > 1) {
      interval = setInterval(() => {
        setthumbnailIndex(
          thumbnailIndex + 1 === images.length
            ? 0
            : thumbnailIndex + 1
        )
      }, IMAGE_STACK_DELAY * 1000)
    }

    return () => {
      interval && clearInterval(interval)
    }
  }, [thumbnailIndex, images])

  return (
    <ImageStackWrapper>
      {/* Stack images */}
      {images &&
        images.length > 1 &&
        images.map((image, index) => {
          const { src, alt } = image

          return (
            <ThumbnailWrapper
              key={`thumbnail-stack-${index}`}
              isSelected={index === thumbnailIndex}
              wasSelected={
                images.length > 1 &&
                index ===
                  (thumbnailIndex - 1 < 0
                    ? images.length - 1
                    : thumbnailIndex - 1)
              }
            >
              <LazyImage src={src} alt={alt} />
            </ThumbnailWrapper>
          )
        })}

      {/* Single thumbnail */}
      {images && images.length === 1 && (
        <LazyImage src={images[0].src} alt={images[0].alt} />
      )}
    </ImageStackWrapper>
  )
}
