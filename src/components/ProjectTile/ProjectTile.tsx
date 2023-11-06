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
    margin: 0 1rem;
  `
)

const TitleWrapper = styled('span')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  background: #333333;
  color: #fff;
  padding: 0.4rem;
  display: block;
`

export const ProjectTile = (props: Props) => {
  const {
    title,
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

  return (
    <Wrapper
      style={styles}
      onMouseEnter={() => set(updateHover(true))}
      onMouseLeave={() => set(updateHover(false))}
      onClick={onClick && onClick}
    >
      {src && <LazyImage alt={alt} src={src} />}
      <TitleWrapper>{title}</TitleWrapper>
    </Wrapper>
  )
}
