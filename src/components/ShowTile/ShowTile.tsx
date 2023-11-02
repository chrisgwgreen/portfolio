import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@mui/material'
import { css, styled } from '@mui/system'
import { animated, useSpring } from '@react-spring/web'
import { LazyImage } from 'components'
import { ReactNode } from 'react'
import { Image } from 'types'

interface Props {
  onClick?: () => void
  title: string
  subtitle?: string
  renderActions?: () => ReactNode
  img: Partial<Image>
  onCloseCallback?: () => void
}

const Wrapper = styled(animated.div)(
  ({
    theme: {
      palette: { tertiary }
    }
  }) => css`
    box-shadow: 0.2rem 1rem 1rem rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;
    min-width: 300px;
    margin: 10px;
  `
)

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardImageWrapper = styled('div')`
  position: relative;
`

const StyledButton = styled(Button)`
  width: 100%;
`

export const ShowTile = (props: Props) => {
  const {
    title,
    subtitle,
    onClick,
    img: { src, alt }
  } = props

  const [styles, set] = useSpring(() => ({
    transform: `scale(1)`,
    from: {
      transform: `scale(1)`
    },
    config: { tension: 400, mass: 2, velocity: 5 }
  }))

  const updateHover = (hovering: boolean) => ({
    transform: `scale(${hovering ? 1.02 : 1})`
  })

  const handleMoreInfoClick = () => {}
  const handleBookTicketsClick = () => {}

  return (
    <>
      <Wrapper
        style={styles}
        onMouseEnter={() => set(updateHover(true))}
        onMouseLeave={() => set(updateHover(false))}
      >
        <CardActionArea onClick={onClick && onClick}>
          <CardImageWrapper>
            {alt && src && <LazyImage alt={alt} src={src} />}
          </CardImageWrapper>
          <CardContent>
            <StyledTypography gutterBottom variant='body1'>
              {title}
            </StyledTypography>
            {subtitle && (
              <Typography variant='body2' color='text.secondary'>
                {subtitle}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <StyledButton
            size='small'
            variant='contained'
            color='secondary'
            disableElevation={true}
            onClick={handleMoreInfoClick}
          >
            Button 1
          </StyledButton>
          <StyledButton
            size='small'
            variant='contained'
            disableElevation={true}
            onClick={handleBookTicketsClick}
          >
            Button 2
          </StyledButton>
        </CardActions>
      </Wrapper>
    </>
  )
}
