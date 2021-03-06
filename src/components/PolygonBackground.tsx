import React, { useEffect, useState, useRef } from 'react'
import styled, {
  DefaultTheme,
  withTheme,
  css
} from 'styled-components/macro'
import {
  easeAnimation,
  media,
  fadeInAnimation,
  moveUpAnimation
} from 'utils'
import {
  SceneProps,
  RendererProps,
  LightProps,
  PlaneProps,
  MaterialProps,
  MeshProps
} from '../types'

interface Props {
  theme: DefaultTheme
}

declare const FSS: {
  Scene: SceneProps
  Light: LightProps
  Plane: PlaneProps
  CanvasRenderer: RendererProps
  Material: MaterialProps
  Mesh: MeshProps
}

/*
 * Styled Components
 */
const PolygonBackgroundWrapper = styled.div((props) => {
  const {
    theme: { polygonBackground }
  } = props

  return css`
    width: 100%;
    height: 100%;
    background: ${polygonBackground};
    opacity: 0;
    animation: ${fadeInAnimation} 0.5s ease-out forwards 0.2s;
  `
})

const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 300px;
  height: 300px;
  margin-left: -150px;
  margin-top: -150px;
  pointer-events: none;
  opacity: 0;

  animation: ${fadeInAnimation} 0.5s ease-out forwards 0.4s,
    ${moveUpAnimation} 0.5s ease-out forwards 0.4s;

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

/*
 * Component
 */
export const PolygonBackground = withTheme((props: Props) => {
  const {
    theme: { Mesh, Lights }
  } = props

  const polygonRef = useRef<HTMLElement>()

  const [scene, setScene] = useState<SceneProps>()
  const [renderer, setRenderer] = useState<RendererProps>()
  const [geometry, setGeometry] = useState<PlaneProps>()
  const [spotlight, setSpotlight] = useState<LightProps>()

  useEffect(() => {
    if (polygonRef.current) {
      const scene = new FSS.Scene()
      const renderer = new FSS.CanvasRenderer()

      renderer.setSize(
        polygonRef.current.offsetWidth,
        polygonRef.current.offsetHeight
      )

      const geometry = new FSS.Plane(
        Mesh.width * renderer.width,
        Mesh.height * renderer.height,
        Math.ceil(renderer.width * Mesh.sliceRatio)
      )

      const spotlights = []

      for (let i = 0; i < 2; i += 1) {
        renderer.clear()

        const light = new FSS.Light(
          Lights.ambient,
          Lights.spotlights[i]
        )
        light.ambientHex = light.ambient.format()
        light.diffuseHex = light.diffuse.format()
        light.setPosition(0, 0, Lights.zOffset)

        scene.add(light)

        spotlights[i] = light
      }

      // Add to page...

      const material = new FSS.Material(Mesh.ambient, Mesh.diffuse)
      const mesh = new FSS.Mesh(geometry, material)

      scene.add(mesh)
      polygonRef.current.appendChild(renderer.element)

      renderer.render(scene)

      setScene(scene)
      setRenderer(renderer)
      setGeometry(geometry)
      setSpotlight(spotlights[1])
    }
  }, [])

  useEffect(() => {
    let isTicking = false
    let isMouseover = false

    /*
     * Event Handlers
     */
    const handleResize = () => {
      if (polygonRef.current && geometry && renderer && scene) {
        renderer.setSize(
          polygonRef.current.offsetWidth,
          polygonRef.current.offsetHeight
        )

        geometry.render(
          Mesh.width * renderer.width,
          Mesh.height * renderer.height,
          Math.ceil(renderer.width * Mesh.sliceRatio)
        )

        renderer.render(scene)
      }
    }

    const handleMouseover = () => {
      isMouseover = true

      if (polygonRef.current) {
        polygonRef.current.addEventListener(
          'mousemove',
          handleMousemove
        )

        polygonRef.current.addEventListener(
          'mouseout',
          handleMouseout
        )
      }
    }

    const handleMousemove = (e: Event) => {
      if (!isTicking && renderer && scene && spotlight) {
        isTicking = true

        requestAnimationFrame(() => {
          const x =
            ((e as MouseEvent).x || (e as MouseEvent).clientX) -
            renderer.width / 2
          const y =
            renderer.height / 2 -
            ((e as MouseEvent).y || (e as MouseEvent).clientY)

          spotlight.setPosition(x, y, 100)
          renderer.render(scene)

          isTicking = false
        })
      }
    }

    const handleMouseout = (e: Event) => {
      if (renderer && scene && spotlight) {
        isMouseover = false

        const x =
          ((e as MouseEvent).x || (e as MouseEvent).clientX) -
          renderer.width / 2
        const y =
          renderer.height / 2 -
          ((e as MouseEvent).y || (e as MouseEvent).clientY)

        const animateReturn = (
          startX: number,
          endX: number,
          startY: number,
          endY: number,
          startTime: number,
          duration: number
        ) => {
          const currentTime = window.performance.now() - startTime

          const { x, y } = easeAnimation(
            startX,
            endX,
            startY,
            endY,
            currentTime,
            duration
          )

          spotlight.setPosition(x, y, 100)

          renderer.render(scene, () => {
            if (currentTime <= duration && !isMouseover) {
              requestAnimationFrame(() => {
                animateReturn(
                  startX,
                  endX,
                  startY,
                  endY,
                  startTime,
                  duration
                )
              })
            }
          })
        }

        animateReturn(x, 0, y, 0, window.performance.now(), 500)

        window.removeEventListener('mousemove', handleMousemove)
        window.removeEventListener('mouseout', handleMouseout)
      }
    }

    window.addEventListener('resize', handleResize)

    if (polygonRef.current && renderer) {
      polygonRef.current.addEventListener(
        'mouseover',
        handleMouseover
      )
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (polygonRef.current) {
        polygonRef.current.removeEventListener(
          'mouseover',
          handleMouseover
        )
        polygonRef.current.removeEventListener(
          'mousemove',
          handleMousemove
        )
        polygonRef.current.removeEventListener(
          'mouseout',
          handleMouseout
        )
      }
    }
  }, [renderer, geometry, scene])

  return (
    <PolygonBackgroundWrapper
      ref={(ref) => {
        polygonRef.current = ref as HTMLElement
      }}
    >
      <Logo src={process.env.PUBLIC_URL + '/gwg.svg'} alt="logo" />
    </PolygonBackgroundWrapper>
  )
})
