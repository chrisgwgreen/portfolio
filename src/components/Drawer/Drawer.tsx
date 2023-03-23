import { useSpring, animated } from 'react-spring'
import { styled } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import { useWindowSize } from 'hooks'

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
  overflow-y: scroll;
`

const CloseWrapper = styled('button')`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: #fff;
  margin: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
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
