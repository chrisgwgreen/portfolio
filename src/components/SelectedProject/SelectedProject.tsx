import { css, styled } from '@mui/system'
import { animated, useSpring } from 'react-spring'
import { Typography } from '@mui/material'
import { AnimatedTitle } from 'components'
import Gallery, { PhotoProps } from 'react-photo-gallery'
import { Project, Media } from 'types'
import { useEffect, useState } from 'react'

interface Props {
  selectedProject: Project
}

const Wrapper = styled(animated.div)(
  ({
    theme: {
      palette: { tertiary }
    }
  }) => css`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: space-evenly;
    height: 100%;
  `
)

const PhotoGalleryWrapper = styled(animated.div)`
  opacity: 0;
`

export const SelectedProject = (props: Props) => {
  const {
    selectedProject: { title, copy, media }
  } = props

  const [photos, setPhotos] = useState<PhotoProps[]>([])

  const styles = useSpring({
    opacity: photos.length > 0 ? 1 : 0
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

    Promise.all(media.map(m => loadImage(m))).then(photos => {
      setPhotos(photos as PhotoProps[])
    })
  }, [media])

  return (
    <Wrapper>
      <div>
        <AnimatedTitle title={title} />
        <Typography variant='body2'>{copy}</Typography>
      </div>
      <PhotoGalleryWrapper style={styles}>
        {photos && <Gallery photos={photos} />}
      </PhotoGalleryWrapper>
    </Wrapper>
  )
}
