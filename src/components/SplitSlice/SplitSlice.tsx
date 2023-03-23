import { ReactNode } from 'react'
import { styled, css } from '@mui/system'

interface Props {
  renderPrimary: () => ReactNode
  renderSecondary: () => ReactNode
  isSecondaryOnTopResponsive?: boolean
}

const Wrapper = styled('div')(({ theme: { breakpoints } }) => {
  return css`
    display: flex;
    flex-direction: row;

    ${breakpoints.down('md')} {
      flex-direction: column-reverse;
    }
  `
})

const PrimaryContent = styled('div')(({ theme: { breakpoints } }) => {
  return css`
    width: 100%;
    margin-top: -6rem;
    z-index: 2;

    ${breakpoints.up('md')} {
      width: 50%;
      margin-top: 0;
    }
  `
})

const SecondaryContent = styled('div')(({ theme: { breakpoints } }) => {
  return css`
    width: 100%;
    margin-left: 0;

    ${breakpoints.up('md')} {
      width: 50%;
      margin-top: 0;
      margin-left: 3rem;
    }
  `
})

export const SplitSlice = (props: Props) => {
  const { renderPrimary, renderSecondary } = props

  return (
    <Wrapper>
      <PrimaryContent>{renderPrimary()}</PrimaryContent>
      <SecondaryContent>{renderSecondary()}</SecondaryContent>
    </Wrapper>
  )
}
