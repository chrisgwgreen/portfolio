'use client'

import { AnimatedTitle } from 'components/AnimatedTitle/AnimatedTitle'
import { Lightbox } from 'components/Lightbox/Lightbox'
import { Spinner } from 'components/Spinner/Spinner'
import { Wave } from 'components/Wave/Wave'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Gallery, { PhotoProps, RenderImageProps } from 'react-photo-gallery'
import { animated, useSpring } from '@react-spring/web'
import { Media, Project } from 'types'
import styles from './SelectedProject.module.css'

interface Props {
  selectedProject: Project
}

// Each photo is a button that opens it in the lightbox. The gallery calls this
// as a function rather than rendering it, so the key it passes has to be applied here
const GalleryImage = (props: RenderImageProps & { key?: string }) => {
  const { key, photo, margin, index, onClick } = props

  return (
    <button
      key={key}
      type='button'
      className={styles.photo}
      style={{ margin }}
      aria-label={`Enlarge image ${index + 1}`}
      onClick={e => onClick?.(e, { ...photo, index })}
    >
      {/* The gallery lays photos out at fractional sizes, which next/image would round */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} width={photo.width} height={photo.height} alt='' />
    </button>
  )
}

export const SelectedProject = (props: Props) => {
  const {
    selectedProject: { title, copy, media, link }
  } = props

  const [photos, setPhotos] = useState<PhotoProps[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  // Hides a hero that fails to load, leaving its placeholder rather than a broken image
  const [failedHeroSrc, setFailedHeroSrc] = useState<string>()

  const spring = useSpring({
    opacity: photos && photos.length > 0 ? 1 : 0
  })

  useEffect(() => {
    const loadImage = async (image: Media) => {
      return new Promise((resolve, reject) => {
        var img = new window.Image()

        img.onload = function () {
          resolve({
            src: img.src,
            width: img.width,
            height: img.height
          })
        }

        img.src = image.src
      })
    }

    Promise.all(media.map(image => loadImage(image))).then(photos => {
      setPhotos(photos as PhotoProps[])
    })
  }, [media])

  const [hero] = media

  return (
    <>
      {hero && (
        <div className={styles.hero}>
          {/* The first thing a project page shows, so it loads first */}
          {hero.src !== failedHeroSrc && (
            <Image
              className={styles.heroImage}
              src={hero.src}
              alt=''
              fill
              sizes='100vw'
              loading='eager'
              fetchPriority='high'
              onError={() => setFailedHeroSrc(hero.src)}
            />
          )}
          <Wave />
        </div>
      )}
      <div className={styles.project}>
        <div className={styles.content}>
          <AnimatedTitle title={title} />
          <p className={styles.copy}>{copy}</p>
        </div>
        {!photos && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}
        <animated.div className={styles.gallery} style={spring}>
          {/* React 19 ignores the library's defaultProps, so pass its defaults explicitly */}
          {photos && (
            <Gallery
              photos={photos}
              margin={10}
              direction='row'
              targetRowHeight={300}
              renderImage={GalleryImage}
              onClick={(_, { index }) => {
                setLightboxIndex(index)
                setIsLightboxOpen(true)
              }}
            />
          )}
        </animated.div>
        {photos && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            isOpen={isLightboxOpen}
            label={title}
            onIndexChange={setLightboxIndex}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
        {link && (
          <a
            className={styles.link}
            href={link}
            target='_blank'
            rel='noreferrer'
          >
            LINK
          </a>
        )}
      </div>
    </>
  )
}
