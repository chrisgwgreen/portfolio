import styles from './Wave.module.css'

// Three translucent layers of the same curve, drifting at different speeds,
// so the edge it sits on appears to ripple. Purely decorative
export const Wave = () => (
  <div className={styles.wave} aria-hidden='true'>
    <div className={styles.layer} />
    <div className={styles.layer} />
    <div className={styles.layer} />
  </div>
)
