'use client'

import { animated, useSpring } from '@react-spring/web'
import { LazyImage } from 'components/LazyImage/LazyImage'
import { ReactNode } from 'react'
import { Image } from 'types'
import styles from './ProjectTile.module.css'

interface Props {
  onClick?: () => void
  title: string
  subtitle?: string
  renderActions?: () => ReactNode
  img: Partial<Image>
  onCloseCallback?: () => void
}

export const ProjectTile = (props: Props) => {
  const {
    title,
    onClick,
    img: { src, alt }
  } = props

  const [spring, api] = useSpring(() => ({
    transform: `scale(1)`,
    from: {
      transform: `scale(1)`
    },
    config: { tension: 400, mass: 2, velocity: 5 }
  }))

  const updateHover = (hovering: boolean) => ({
    transform: `scale(${hovering ? 1.02 : 1})`
  })

  return (
    <animated.div
      className={styles.tile}
      style={spring}
      onMouseEnter={() => api.start(updateHover(true))}
      onMouseLeave={() => api.start(updateHover(false))}
      onClick={onClick && onClick}
    >
      {src && <LazyImage alt={alt} src={src} />}
      <span className={styles.title}>{title}</span>
    </animated.div>
  )
}
