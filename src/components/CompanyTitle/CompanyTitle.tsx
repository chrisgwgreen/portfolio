import { styled, css } from '@mui/system'

const CompanyTitleWrapper = styled('div')(props => {
  const {
    theme: {
      palette: { primary }
    }
  } = props

  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: normal;
    color: ${primary};
  `
})

export const CompanyTitle = () => (
  <CompanyTitleWrapper>GWGreen Ltd.</CompanyTitleWrapper>
)
