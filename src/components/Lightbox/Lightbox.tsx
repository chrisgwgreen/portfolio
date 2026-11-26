'use client'

import { Icon } from 'components/Icon/Icon'
import { cx } from 'lib/cx'
import Image from 'next/image'
import { KeyboardEvent, PointerEvent, useEffect, useRef } from 'react'
import styles from './Lightbox.module.css'

interface Photo {
  src: string
  width: number
  height: number
}

interface Props {
  photos: Photo[]
  index: number
  isOpen: boolean
  label: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

// Safari has no closedby yet, so a press and release on the backdrop closes it there
const isOutside = (e: PointerEvent, dialog: HTMLDialogElement) => {
  const r = dialog.getBoundingClientRect()
  return (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  )
}

// A native modal <dialog>: the browser makes the page inert, contains focus,
// closes on Esc or the back gesture and returns focus to the opening control
export const Lightbox = (props: Props) => {
  const { photos, index, isOpen, label, onIndexChange, onClose } = props
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pressedOutside = useRef(false)
  const photo = photos[index]
  const hasSiblings = photos.length > 1

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const step = (by: number) =>
    onIndexChange((index + by + photos.length) % photos.length)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!hasSiblings) return
    if (e.key === 'ArrowLeft') step(-1)
    if (e.key === 'ArrowRight') step(1)
  }

  const needsLightDismiss = () =>
    !('closedBy' in HTMLDialogElement.prototype)

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-label={`${label}, image ${index + 1} of ${photos.length}`}
      {...{ closedby: 'any' }}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onPointerDown={e => {
        pressedOutside.current = isOutside(e, e.currentTarget)
      }}
      onPointerUp={e => {
        if (
          needsLightDismiss() &&
          pressedOutside.current &&
          isOutside(e, e.currentTarget)
        )
          e.currentTarget.close()
      }}
    >
      {/* First in the dialog, so showModal() focuses it */}
      <form method='dialog'>
        <button className={cx(styles.button, styles.close)} aria-label='Close'>
          <Icon name='close' />
        </button>
      </form>
      {photo && (
        <Image
          key={photo.src}
          className={styles.image}
          src={photo.src}
          alt=''
          width={photo.width}
          height={photo.height}
        />
      )}
      {hasSiblings && (
        <>
          <button
            type='button'
            className={cx(styles.button, styles.previous)}
            aria-label='Previous image'
            onClick={() => step(-1)}
          >
            <Icon name='previous' />
          </button>
          <button
            type='button'
            className={cx(styles.button, styles.next)}
            aria-label='Next image'
            onClick={() => step(1)}
          >
            <Icon name='next' />
          </button>
        </>
      )}
    </dialog>
  )
}
