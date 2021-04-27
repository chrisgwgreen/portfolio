import React from 'react'
import styled from 'styled-components/macro'

/*
 * Styled Components
 */
const BurgerWrapper = styled.div`
  position: relative;
  width: 2rem;
  height: 1rem;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;

  :before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 2px solid #000;
    transform: translateY(-1px);
  }
`

/*
 * Component
 */
export const Burger = () => {
  return <BurgerWrapper />
}
