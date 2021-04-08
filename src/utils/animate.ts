import { keyframes } from 'styled-components/macro'
import { Easing } from './easing'

export const easeAnimation = (
  startX: number,
  endX: number,
  startY: number,
  endY: number,
  currentTime: number,
  duration: number
) => {
  const easeX = Easing.easeOutSine.apply(this, [
    1,
    currentTime,
    0,
    Math.abs(startX - endX),
    duration
  ])

  const easeY = Easing.easeOutSine.apply(this, [
    1,
    currentTime,
    0,
    Math.abs(startY - endY),
    duration
  ])

  let x
  let y

  if (startX < endX) {
    x = Math.round(startX + easeX) //Increasing...
  } else {
    x = Math.round(startX - easeX) //Decreasing...
  }

  if (startY < endY) {
    y = Math.round(startY + easeY) //Increasing...
  } else {
    y = Math.round(startY - easeY) //Decreasing...
  }

  return { x, y }
}

/*
 * Fade Animation
 */
export const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

/*
 * Move Up Animation
 */
export const moveUpAnimation = keyframes`
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`
