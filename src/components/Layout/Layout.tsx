import { ReactNode } from 'react'
import { styled, css } from '@mui/system'
import { CompanyTitle } from 'components'
import { media } from 'utils'
import { useWindowSize } from 'hooks'

interface Props {
  children: ReactNode
  isColumn?: boolean
}

const LayoutWrapper = styled('div')<{ isColumn: boolean; height: number }>(
  props => {
    const { height } = props

    return css`
      position: relative;
      overflow: hidden;
      width: 100%;
      height: ${height}px;
    `
  }
)

const ContentWrapper = styled('div')`
  margin: 2rem;
  height: calc(100% - 8rem);
  position: relative;

  ${media.mobile} {
    margin: 2rem;
  }
`

export const Layout = (props: Props) => {
  const { children, isColumn = true } = props

  const { windowHeight } = useWindowSize()

  return (
    <>
      {windowHeight && (
        <LayoutWrapper isColumn={isColumn} height={windowHeight}>
          <ContentWrapper>{children}</ContentWrapper>
          <CompanyTitle />
        </LayoutWrapper>
      )}
    </>
  )
}
