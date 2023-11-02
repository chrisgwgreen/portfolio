import { Typography } from '@mui/material'
import { css, styled } from '@mui/system'
import { animated } from '@react-spring/web'
import { useState } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { Image } from 'types'

interface Props {
  images: Image[]
}

const Wrapper = styled(animated.div, {
  shouldForwardProp: prop => prop !== 'imagesLength'
})<{ imagesLength: number }>(
  ({ imagesLength }) => css`
    min-height: 100vh;
    height: ${50 * imagesLength}vh;
    position: relative;
  `
)

const Scroller = styled(Parallax)`
  width: 100%;
  top: 700px;
  bottom: 700px;
  position: absolute;
`

const StyledTypography = styled(Typography)`
  margin-top: 1rem;
  min-height: 3rem;
`

const StickyWrapper = styled('div')`
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Blush = styled('div')`
  position: absolute;
  z-index: 0;
  width: 450px;
  height: 450px;
  border-radius: 100%;
  background-image: linear-gradient(60deg, #92c9f9, #c7f8ff);
  filter: blur(60px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Content = styled('div')<{ isVisible: boolean }>(
  ({ isVisible }) => css`
    opacity: ${isVisible ? '1' : '0'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0)
      scale3d(${isVisible ? '1' : '0.96'}, ${isVisible ? '1' : '0.96'}, 1);
    transition: opacity 0.4s, transform 0.4s;
    width: 450px;
    height: 450px;
    overflow: visible;
  `
)

const StyledImg = styled('img')`
  width: 400px;
  height: 400px;
`

const ImageWrapper = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  filter: drop-shadow(0 0 1rem rgb(0 0 0 / 40%));
  padding: 0.8rem;
  background: #fff;
`

export const Gallery = (props: Props) => {
  const { images } = props
  const [progress, setProgress] = useState(0)

  const currentIndex = Math.floor(progress * images.length)

  return (
    <Wrapper imagesLength={images.length}>
      <Scroller onProgressChange={setProgress} />
      <StickyWrapper>
        {images.map((image, index) => {
          return (
            <Content
              isVisible={index === currentIndex}
              key={`gallery-${index}`}
            >
              <Blush />
              <ImageWrapper>
                <StyledImg src={image.src} alt='' />
                <StyledTypography>{image.title}</StyledTypography>
              </ImageWrapper>
            </Content>
          )
        })}
      </StickyWrapper>
    </Wrapper>
  )
}
