import { Easing } from './easing'

export const animate = (
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
