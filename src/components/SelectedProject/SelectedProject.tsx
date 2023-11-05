import { css, styled } from '@mui/system'
import { animated } from '@react-spring/web'
import { Typography } from '@mui/material'
import { AnimatedTitle } from 'components'
import Gallery from 'react-photo-gallery'
import { Project } from 'types'
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

export const SelectedProject = (props: Props) => {
  const {
    selectedProject: { title, copy, media }
  } = props

  const [imageSize, setImageSize] = useState<any[]>([])

  useEffect(() => {
    // TODO return promise and response to "all"...
    // CONTINUE HERE...
    // Promise.all([loadImage(images.menu), loadImage(images.map)]).then()
    // {
    //   console.log('menu:', images.menu.status)
    //   console.log('map :', images.map.status)
    // }

    media.forEach(m => {
      var img = new Image()

      img.onload = function () {
        setImageSize(prev => {
          return [
            ...prev,
            {
              src: m.src,
              width: img.width,
              height: img.height
            }
          ]
        })
      }
      img.src = m.src
    })
  }, [media])

  // useEffect(() => {
  //   const aspectRatio = (height: number, width: number) => {
  //     if (height > width) {
  //       return { width: 1, height: height / width }
  //     } else {
  //       return { height: 1, width: width / height }
  //     }
  //   }

  //   let photosForGallery = (imgArr: any) => {
  //     imgArr.forEach((img: any) => {
  //       const mockImage = document.createElement('img')
  //       const src = img.src

  //       mockImage.onload = () => {
  //         let aspect = aspectRatio(mockImage.height, mockImage.width)

  //         console.log('ONLOAD', src, aspect.width, aspect.height)

  //         images.current.push({
  //           src: mockImage.src,
  //           width: aspect.width,
  //           height: aspect.height
  //         })
  //       }

  //       mockImage.src = src
  //     })
  //   }

  //   if (media.length > 0) {
  //     photosForGallery(media)
  //   }
  // }, [media])

  return (
    <Wrapper>
      <div>
        <AnimatedTitle title={title} />
        <Typography variant='body2'>{copy}</Typography>
      </div>
      {imageSize && <Gallery photos={imageSize} />}
    </Wrapper>
  )
}
