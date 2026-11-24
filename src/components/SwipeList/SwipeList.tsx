import { ReactElement } from 'react'
import styles from './SwipeList.module.css'

interface Props {
  children: ReactElement[]
}

export const SwipeList = (props: Props) => {
  const { children } = props

  return (
    <div className={styles.swipeList}>
      <div className={styles.track}>{children}</div>
    </div>
  )
}
