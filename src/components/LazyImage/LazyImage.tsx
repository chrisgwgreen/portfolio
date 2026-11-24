'use client'

import { Skeleton } from 'components/Skeleton/Skeleton'
import { cx } from 'lib/cx'
import Image from 'next/image'
import { useState } from 'react'
import { HTMLImage } from 'types'
import styles from './LazyImage.module.css'

// Lazy-loads natively, showing a skeleton until the image fades in
export const LazyImage = (props: HTMLImage) => {
  const { src, alt = '' } = props
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={styles.lazyImage}>
      <Skeleton className={styles.skeleton} />
      <div className={cx(styles.frame, isVisible && styles.visible)}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          // Placeholder 16:9 size; the CSS lets the image keep its own aspect ratio
          width={300}
          height={169}
          // A failed image also reports as loaded, so only reveal one with pixels
          onLoad={e => e.currentTarget.naturalWidth > 0 && setIsVisible(true)}
        />
      </div>
    </div>
  )
}
