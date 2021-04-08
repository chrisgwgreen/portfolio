import React from 'react'
import styled, { css } from 'styled-components/macro'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  src: string
  alt?: string
}

/*
 * Styled Components
 */
const ImageWrapper = styled.div((props) => {
  const {
    theme: { background }
  } = props

  return css`
    width: 100%;
    height: 100%;
    background: ${background};
  `
})

/*
 * Component
 */
export const LazyImage = (props: Props) => {
  const { src, alt } = props

  return (
    <ImageWrapper>
      <LazyLoadImage
        alt={alt}
        src={src}
        height="100%"
        width="100%"
        effect="opacity"
      />
    </ImageWrapper>
  )
}
