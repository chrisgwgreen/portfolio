import { cx } from 'lib/cx'
import styles from './Skeleton.module.css'

interface Props {
  className?: string
}

// Decorative placeholder shown while content loads
export const Skeleton = ({ className }: Props) => (
  <div className={cx(styles.skeleton, className)} aria-hidden='true' />
)
