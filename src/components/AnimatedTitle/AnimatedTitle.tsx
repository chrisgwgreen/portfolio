import { css, styled } from '@mui/system'
import { animated, useTrail } from '@react-spring/web'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  isRightAligned?: boolean
  isSmall?: boolean
  title: string
}

export const Wrapper = styled('span')<{ isRightAligned: boolean }>(
  ({ isRightAligned }) => css`
    position: relative;
    display: flex;

    ${isRightAligned &&
    css`
      justify-content: right;
      text-align: right;
    `}
  `
)

const AnimatedText = styled(animated.span, {
  shouldForwardProp: prop => prop !== 'isSmall'
})<{ isSmall?: boolean }>(
  ({
    isSmall = false,
    theme: {
      palette: { primary }
    }
  }) => css`
    position: relative;
    width: 100%;
    line-height: ${isSmall ? '2rem' : '3rem'};
    color: black;
    font-size: ${isSmall ? '2rem' : '3rem'};
    font-weight: 800;
    letter-spacing: 0;
    will-change: transform, opacity;
    color: ${primary.main};
  `
)

const TitleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

export const Underline = styled('div')<{
  isRightAligned: boolean
  isSmall?: boolean
}>(
  ({
    isRightAligned,
    isSmall,
    theme: {
      palette: { primary }
    }
  }) => css`
    width: 6rem;
    height: 0.25rem;
    margin: ${isSmall ? '0 0 1rem 0' : '1rem 0'};
    align-self: ${isRightAligned ? 'end' : 'start'};
    background: ${primary.main};
  `
)

const AnimatedTitleWrapper: React.FC<{
  open: boolean
  isRightAligned: boolean
  isSmall?: boolean
  children: JSX.Element[]
}> = props => {
  const { open, children, isRightAligned, isSmall = false } = props

  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: 40,
    from: { opacity: 0, x: 20, height: 0 }
  })

  return (
    <TitleWrapper>
      {trail.map(({ height, ...style }, index) => (
        <AnimatedText key={index} style={style} isSmall={isSmall}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </AnimatedText>
      ))}
      <Underline isRightAligned={isRightAligned} isSmall={isSmall} />
    </TitleWrapper>
  )
}

export const AnimatedTitle = (props: Props) => {
  const { isRightAligned = false, title, isSmall } = props

  const { ref, inView } = useInView({
    threshold: 1
  })

  return (
    <Wrapper ref={ref} isRightAligned={isRightAligned}>
      <AnimatedTitleWrapper
        open={inView}
        isRightAligned={isRightAligned}
        isSmall={isSmall}
      >
        {title.split('%').map(line => (
          <span key={`animated-title-${uuidv4()}`}>{line}</span>
        ))}
      </AnimatedTitleWrapper>
    </Wrapper>
  )
}
