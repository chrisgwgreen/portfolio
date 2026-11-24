'use client'

import CloseIcon from '@mui/icons-material/Close'
import { animated, useSpring } from '@react-spring/web'
import { useWindowSize } from 'hooks'
import { ReactNode } from 'react'
import styles from './Drawer.module.css'

interface Props {
  show: boolean
  onClose: () => void
  children: ReactNode
}

export const Drawer = (props: Props) => {
  const { show, onClose, children } = props
  const { windowWidth } = useWindowSize()

  const spring = useSpring({
    left: show ? 0 : windowWidth,
    opacity: show ? 1 : 0
  })

  return (
    <>
      <animated.div className={styles.drawer} style={spring}>
        <button className={styles.close} onClick={onClose}>
          <CloseIcon fontSize='medium' />
        </button>
        {children}
      </animated.div>
    </>
  )
}
