import styles from './Spinner.module.css'

// An indeterminate <progress> (no value) is announced as busy by assistive technology
export const Spinner = () => (
  <progress className={styles.spinner} aria-label='Loading' />
)
