'use client'

import { Skeleton } from '@mui/material'
import { styled } from '@mui/system'
import { cx } from 'lib/cx'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { HTMLImage } from 'types'
import styles from './LazyImage.module.css'

// Stays on MUI's styled until Skeleton itself is replaced
const StyledSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
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
    <div className={styles.lazyImage}>
      <StyledSkeleton variant='rectangular' animation='wave' />
      <div className={cx(styles.frame, isVisible && styles.visible)}>
        <LazyLoadImage
          className={styles.image}
          alt={alt}
          src={src}
          effect='opacity'
          afterLoad={handleAfterLoad}
        />
      </div>
    </div>
  )
}
