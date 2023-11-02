import { useState } from 'react'
// import { useSpring, useSpringRef } from '@react-spring/web'
import { Skeleton } from '@mui/material'
import { css, styled } from '@mui/system'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { HTMLImage } from 'types'

const Wrapper = styled('div')`
  position: relative;
  padding-top: 56.25%;
`

const StyledSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

const ImageWrapper = styled('div')<{ isVisible?: boolean }>(
  ({ isVisible = true }) => css`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: opacity 0.4s;
    opacity: ${isVisible ? '1' : '0'};
  `
)

const StyledLazyLoadImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
`

export const LazyImage = (props: HTMLImage) => {
  const { src, alt } = props
  const [isVisible, setIsVisible] = useState(false)

  // const imageRef = useSpringRef()
  // const imageSprings = useSpring({
  //   ref: imageRef,
  //   from: { opacity: '0'}
  // })

  const handleAfterLoad = () => {
    setIsVisible(true)

    // backApi.start({
    //   delay: isOpen.current ? letterDuration + 2 * foldDuration : foldDuration,
    //   from: {
    //     transform: `scaleY(${isOpen.current ? 100 : 0}%)`
    //   },
    //   to: {
    //     transform: `scaleY(${isOpen.current ? 0 : 100}%)`
    //   },
    //   config: {
    //     mass: 1,
    //     friction: 40,
    //     tension: 500,
    //     duration: foldDuration
    //   }
    // })
  }

  return (
    <Wrapper>
      <StyledSkeleton variant='rectangular' animation='wave' />
      <ImageWrapper isVisible={isVisible}>
        <StyledLazyLoadImage
          alt={alt}
          src={src}
          effect='opacity'
          afterLoad={handleAfterLoad}
        />
      </ImageWrapper>
    </Wrapper>
  )
}
