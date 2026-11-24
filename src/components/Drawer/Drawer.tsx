'use client'

import { animated, useSpring } from '@react-spring/web'
import { Icon } from 'components/Icon/Icon'
import { useWindowSize } from 'hooks'
import { ReactNode } from 'react'
import styles from './Drawer.module.css'

interface Props {
  id?: string
  show: boolean
  onClose: () => void
  children: ReactNode
}

export const Drawer = (props: Props) => {
  const { id, show, onClose, children } = props
  const { windowWidth } = useWindowSize()

  const spring = useSpring({
    left: show ? 0 : windowWidth,
    opacity: show ? 1 : 0
  })

  return (
    <>
      <animated.div id={id} className={styles.drawer} style={spring}>
        <button
          className={styles.close}
          aria-label='Close'
          onClick={onClose}
        >
          <Icon name='close' />
        </button>
        {children}
      </animated.div>
    </>
  )
}
