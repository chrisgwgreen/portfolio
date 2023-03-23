import { styled } from '@mui/system'
import { media } from 'utils'
import { ReactComponent as GWGLogo } from 'assets/gwg.svg'

const LogoWrapper = styled(GWGLogo)`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 300px;
  height: 300px;
  margin-left: -150px;
  margin-top: -150px;
  pointer-events: none;
  // opacity: 0;
  filter: drop-shadow(0 0.5rem 0.5rem rgb(0 0 0 / 0.4));

  ${media.tablet} {
    width: 250px;
    height: 250px;
    margin-left: -125px;
    margin-top: -125px;
  }

  ${media.mobile} {
    width: 200px;
    height: 200px;
    margin-left: -100px;
    margin-top: -100px;
  }
`

export const Logo = () => <LogoWrapper />
