'use client'

import { animated, useTrail } from '@react-spring/web'
import { cx } from 'lib/cx'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { v4 as uuidv4 } from 'uuid'
import styles from './AnimatedTitle.module.css'

interface Props {
  isRightAligned?: boolean
  isSmall?: boolean
  title: string
}

const AnimatedTitleWrapper: React.FC<{
  open: boolean
  isRightAligned: boolean
  isSmall?: boolean
  children: React.JSX.Element[]
}> = props => {
  const { open, children, isRightAligned, isSmall = false } = props

  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: 40,
    from: { opacity: 0, x: 20, height: 0 }
  })

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <animated.div
          key={index}
          className={cx(styles.line, isSmall && styles.small)}
          style={style}
        >
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
      <div
        className={cx(
          styles.underline,
          isSmall && styles.small,
          isRightAligned && styles.rightAligned
        )}
      />
    </div>
  )
}

export const AnimatedTitle = (props: Props) => {
  const { isRightAligned = false, title, isSmall } = props

  const { ref, inView } = useInView({
    threshold: 1
  })

  return (
    <div
      ref={ref}
      className={cx(styles.title, isRightAligned && styles.rightAligned)}
    >
      <AnimatedTitleWrapper
        open={inView}
        isRightAligned={isRightAligned}
        isSmall={isSmall}
      >
        {title.split('%').map(line => (
          <span key={`animated-title-${uuidv4()}`}>{line}</span>
        ))}
      </AnimatedTitleWrapper>
    </div>
  )
}
