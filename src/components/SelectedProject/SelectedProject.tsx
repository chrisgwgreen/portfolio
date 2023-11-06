import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import { AnimatedTitle } from 'components'
import { useEffect, useState } from 'react'
import Gallery, { PhotoProps } from 'react-photo-gallery'
import { animated, useSpring } from 'react-spring'
import { Media, Project } from 'types'

interface Props {
  selectedProject: Project
}

const Wrapper = styled(animated.div)`
  max-width: 31.25rem;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PhotoGalleryWrapper = styled(animated.div)`
  opacity: 0;

  img {
    box-shadow: 0.2rem 1rem 1rem rgba(0, 0, 0, 0.1);
  }
`

const ContentWrapper = styled('div')`
  margin-bottom: 0.5rem;
`

const StyledLink = styled('a')`
  background: #333333;
  color: #fff;
  padding: 1rem;
  margin: 1rem 0.5rem;
`

export const SelectedProject = (props: Props) => {
  const {
    selectedProject: { title, copy, media, link }
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

    Promise.all(media.map(image => loadImage(image))).then(photos => {
      setPhotos(photos as PhotoProps[])
    })
  }, [media])

  return (
    <Wrapper>
      <ContentWrapper>
        <AnimatedTitle title={title} />
        <Typography variant='body2'>{copy}</Typography>
      </ContentWrapper>
      <PhotoGalleryWrapper style={styles}>
        {photos && <Gallery photos={photos} margin={10} />}
      </PhotoGalleryWrapper>
      {link && (
        <StyledLink href={link} target='_blank' rel='noreferrer'>
          LINK
        </StyledLink>
      )}
    </Wrapper>
  )
}
