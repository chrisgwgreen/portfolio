import { Eyes } from 'features/eyes/Eyes'
import Link from 'next/link'
import styles from './NotFound.module.css'

export const NotFound = () => (
  <>
    <Eyes wander />
    <div className={styles.card}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>
        Even with all these eyes, we couldn&apos;t find that page.
      </p>
      <Link className={styles.homeLink} href='/'>
        Take me home
      </Link>
    </div>
  </>
)
