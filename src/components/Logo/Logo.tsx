import gwgLogo from 'assets/gwg.svg'
import Image from 'next/image'
import styles from './Logo.module.css'

// The logo is the largest thing above the fold, so it loads first rather than lazily
export const Logo = () => (
  <Image
    className={styles.logo}
    src={gwgLogo}
    alt='GWGreen Ltd.'
    loading='eager'
    fetchPriority='high'
  />
)
