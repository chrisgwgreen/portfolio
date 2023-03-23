import { ReactNode } from 'react'
import { styled, css } from '@mui/system'

interface Props {
  renderPrimary: () => ReactNode
  renderSecondary: () => ReactNode
  isSecondaryOnTopResponsive?: boolean
}

const Wrapper = styled('div')<{ isSecondaryOnTopResponsive: boolean }>(
  ({ isSecondaryOnTopResponsive, theme: { breakpoints } }) => {
    return css`
      display: flex;
      flex-direction: row;
      margin: 6rem 0;

      ${breakpoints.down('md')} {
        flex-direction: ${isSecondaryOnTopResponsive
          ? 'column-reverse'
          : 'column'};
      }
    `
  }
)

const Content = styled('div')(({ theme: { breakpoints } }) => {
  return css`
    width: 100%;
    margin-top: 6rem;

    ${breakpoints.up('md')} {
      width: 50%;
      margin-top: 0rem;

      :first-of-type {
        margin-right: 1rem;
      }

      :last-of-type {
        margin-left: 1rem;
      }
    }
  `
})

export const SplitSlice = (props: Props) => {
  const {
    renderPrimary,
    renderSecondary,
    isSecondaryOnTopResponsive = false
  } = props

  return (
    <Wrapper isSecondaryOnTopResponsive={isSecondaryOnTopResponsive}>
      <Content>{renderPrimary()}</Content>
      <Content>{renderSecondary()}</Content>
    </Wrapper>
  )
}
