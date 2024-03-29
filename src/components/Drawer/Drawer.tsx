import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/system'
import { useWindowSize } from 'hooks'
import { animated, useSpring } from 'react-spring'

interface Props {
  show: boolean
  onClose: () => void
  children: JSX.Element
}

const Wrapper = styled(animated.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 2;
  opacity: 0;
  padding: 2rem;
  overflow-x: hidden;
  overflow-y: scroll;
`

const CloseWrapper = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: #fff;
  margin: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 3;
`

export const Drawer = (props: Props) => {
  const { show, onClose, children } = props
  const { windowWidth } = useWindowSize()

  const styles = useSpring({
    left: show ? 0 : windowWidth,
    opacity: show ? 1 : 0
  })

  return (
    <>
      <Wrapper style={styles}>
        <CloseWrapper onClick={onClose}>
          <CloseIcon fontSize='medium' />
        </CloseWrapper>
        {children}
      </Wrapper>
    </>
  )
}
