'use client'

import { CircularProgress, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { AnimatedTitle } from 'components/AnimatedTitle/AnimatedTitle'
import { useEffect, useState } from 'react'
import Gallery, { PhotoProps } from 'react-photo-gallery'
import { animated, useSpring } from '@react-spring/web'
import { Media, Project } from 'types'
import styles from './SelectedProject.module.css'

interface Props {
  selectedProject: Project
}

// Stays on MUI's styled until Typography itself is replaced
const StyledCopy = styled(Typography)`
  margin: 1rem 0;
`

export const SelectedProject = (props: Props) => {
  const {
    selectedProject: { title, copy, media, link }
  } = props

  const [photos, setPhotos] = useState<PhotoProps[] | null>(null)

  const spring = useSpring({
    opacity: photos && photos.length > 0 ? 1 : 0
  })

  useEffect(() => {
    const loadImage = async (image: Media) => {
      return new Promise((resolve, reject) => {
        var img = new Image()

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

  return (
    <div className={styles.project}>
      <div className={styles.content}>
        <AnimatedTitle title={title} />
        <StyledCopy variant='body2'>{copy}</StyledCopy>
      </div>
      {!photos && (
        <div className={styles.loading}>
          <CircularProgress />
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
          />
        )}
      </animated.div>
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
  )
}
