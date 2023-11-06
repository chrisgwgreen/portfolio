import { css, styled } from '@mui/system'

interface Props {
  src: string
}

const Wrapper = styled('div')`
  border-color: #dfe1e5;
  border-style: solid;
  border-width: 0 4px 4px 4px;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  min-height: 200px;
`

const StyledImage = styled('img')`
  display: block;
  width: 100%;
`

const Header = styled('div')`
  display: flex;
  flex-direction: row;
  height: 1.5rem;
  background: #dfe1e5;
  align-items: center;
`

const Controls = styled('div')`
  flex-grow: 1;
  display: flex;
`

const Control = styled('div')<{ color: string }>(
  ({ color }) => css`
    width: 0.4rem;
    height: 0.4rem;
    margin: 0 0.1rem;
    background: ${color};
    border-radius: 50%;
  `
)

const SearchBar = styled('div')`
  height: 1rem;
  background: #fff;
  flex-grow: 5;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.5rem;
  padding-left: 0.5rem;
`

const Menu = styled('div')`
  flex-grow: 1;
`

export const BrowserImgFrame = (props: Props) => {
  const { src } = props

  return (
    <Wrapper>
      <Header>
        <Controls>
          <Control color='#ff5f57' />
          <Control color='#ffbd2f' />
          <Control color='#28c841' />
        </Controls>
        <SearchBar>www.gwgreenltd.co.uk/</SearchBar>
        <Menu />
      </Header>
      <StyledImage src={src} alt='Browser frame' />
    </Wrapper>
  )
}
