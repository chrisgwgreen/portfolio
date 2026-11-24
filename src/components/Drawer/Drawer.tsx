'use client'

import { animated, useSpring } from '@react-spring/web'
import { Icon } from 'components/Icon/Icon'
import { useWindowSize } from 'hooks'
import { ReactNode, useState } from 'react'
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

  // Once fully closed the drawer leaves the layout, so its lazy images don't load
  // early and its controls can't be reached by keyboard or screen readers
  const [isClosed, setIsClosed] = useState(!show)
  if (show && isClosed) setIsClosed(false)

  const spring = useSpring({
    left: show ? 0 : windowWidth,
    opacity: show ? 1 : 0,
    onRest: () => !show && setIsClosed(true)
  })

  return (
    <>
      <animated.div
        id={id}
        className={styles.drawer}
        style={{ ...spring, display: isClosed ? 'none' : undefined }}
      >
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
