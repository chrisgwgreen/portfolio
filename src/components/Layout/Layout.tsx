import { styled } from '@mui/system'
import { CompanyTitle } from 'components'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = styled('div')`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 4rem);
  margin: 2rem;
`

export const Layout = (props: Props) => {
  const { children } = props

  return (
    <LayoutWrapper>
      {children}
      <CompanyTitle />
    </LayoutWrapper>
  )
}
