import styles from './Icon.module.css'

// Material Design icon paths, drawn on a 24×24 grid
const paths = {
  menu: 'M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z',
  close:
    'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
}

interface Props {
  name: keyof typeof paths
}

// Decorative: the control that contains the icon carries the accessible name
export const Icon = ({ name }: Props) => (
  <svg
    className={styles.icon}
    viewBox='0 0 24 24'
    aria-hidden='true'
    focusable='false'
  >
    <path d={paths[name]} />
  </svg>
)
