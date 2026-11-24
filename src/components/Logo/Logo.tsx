import gwgLogo from 'assets/gwg.svg'
import styles from './Logo.module.css'

export const Logo = () => (
  // An SVG on a static export: next/image would serve it unoptimised anyway
  // eslint-disable-next-line @next/next/no-img-element
  <img className={styles.logo} src={gwgLogo.src} alt='GWGreen Ltd.' />
)
