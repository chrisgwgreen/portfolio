import { css, styled } from '@mui/system'
import { animated } from '@react-spring/web'
import { Typography } from '@mui/material'
import { LazyImage, AnimatedTitle } from 'components'
import { ReactNode } from 'react'
import { Project } from 'types'

interface Props {
  selectedProject: Project
}

const Wrapper = styled(animated.div)(
  ({
    theme: {
      palette: { tertiary }
    }
  }) => css``
)

export const SelectedProject = (props: Props) => {
  const {
    selectedProject: { title, copy, media }
  } = props

  return (
    <Wrapper>
      <div>
        <AnimatedTitle isRightAligned title={title} />
        <Typography align='right' variant='body2'>
          {copy}
        </Typography>
      </div>

      <div>{media && media.map(({ src }) => <LazyImage src={src} />)}</div>
    </Wrapper>
  )
}
