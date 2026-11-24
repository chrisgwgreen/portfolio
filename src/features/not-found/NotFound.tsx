'use client'

import { styled } from '@mui/system'
import { Eyes } from 'features/eyes/Eyes'
import Link from 'next/link'
import { media } from 'utils'

const Card = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: max-content;
  max-width: calc(100% - 2rem);
  padding: 2rem 3rem;
  border: 0.25rem solid #333333;
  background: #fff;
  color: #333333;
  text-align: center;
  box-shadow: 0.2rem 1rem 1rem rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    padding: 1.5rem;
  }
`

const Code = styled('h1')`
  margin: 0;
  font-size: 8rem;
  font-weight: normal;
  line-height: 1;

  ${media.mobile} {
    font-size: 5rem;
  }
`

const Message = styled('p')`
  margin: 0.5rem 0 1.5rem;
  font-size: 1.5rem;

  ${media.mobile} {
    font-size: 1.25rem;
  }
`

const HomeLink = styled(Link)`
  display: inline-block;
  background: #333333;
  color: #fff;
  padding: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
`

export const NotFound = () => (
  <>
    <Eyes wander />
    <Card>
      <Code>404</Code>
      <Message>
        Even with all these eyes, we couldn&apos;t find that page.
      </Message>
      <HomeLink href='/'>Take me home</HomeLink>
    </Card>
  </>
)
