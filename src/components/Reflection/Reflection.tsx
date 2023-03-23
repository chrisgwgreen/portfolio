import { useState, useEffect } from 'react'
import { styled, css } from '@mui/system'
import { useInView } from 'react-intersection-observer'

interface Props {
  children: JSX.Element
}

const Wrapper = styled('div')`
  max-width: 20rem;
  position: relative;
  margin-bottom: -110px;
`

const TopComponent = styled('div')<{ isOpen: boolean }>(
  ({ isOpen }) => css`
    width: 100%;
    transform: ${isOpen ? 'translateY(0)' : 'translateY(-50px)'};
    transition: 0.5s ease-out;
  `
)

const BottomComponent = styled('div')<{ isOpen: boolean }>(
  ({ isOpen }) => css`
    width: 100%;
    transform: rotate(180deg) scaleX(-1)
      ${isOpen ? 'translateY(0)' : 'translateY(-50px)'};
    mask-image: linear-gradient(to bottom, transparent 20%, black 100%);
    transition: 0.5s ease-out;
    opacity: ${isOpen ? '0.2' : '0'};
  `
)

const Shadow = styled('div')<{ isOpen: boolean }>(
  ({ isOpen }) => css`
    position: absolute;
    z-index: -2;
    height: 8px;
    width: ${isOpen ? '101%' : '0'};
    left: 50%;
    bottom: calc(50% - 0.5rem);
    transform: translateX(-50%) translateY(-4px);
    opacity: ${isOpen ? '0.2' : '0'};
    background: #111;
    border-radius: 100px / 5px;
    filter: blur(2px);
    transition: 0.5s ease-out;
  `
)

export const Reflection = (props: Props) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [inView, isOpen])

  return (
    <Wrapper ref={ref}>
      <TopComponent isOpen={isOpen}>{children}</TopComponent>
      <Shadow isOpen={isOpen} />
      <BottomComponent isOpen={isOpen}>{children}</BottomComponent>
    </Wrapper>
  )
}
