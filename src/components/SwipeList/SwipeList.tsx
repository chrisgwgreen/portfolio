import { styled } from '@mui/system'
import { ReactElement } from 'react'

interface Props {
  children: ReactElement[]
}

const Wrapper = styled('div')`
  position: relative;
  margin: 0 -4rem;

  :before,
  :after {
    content: '';
    position: absolute;
    width: calc(5rem - 10px);
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
  }

  :after {
    right: 0;
    left: initial;
  }
`

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 2rem calc(5rem - 10px);

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SwipeList = (props: Props) => {
  const { children } = props

  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  )
}
