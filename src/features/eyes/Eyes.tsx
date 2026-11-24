'use client'

import { useWindowSize } from 'hooks'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EYE_SIZE } from 'utils'
import styles from './Eyes.module.css'
import { getTexture } from './texture'


interface Point {
  x: number
  y: number
}

interface Eye {
  eyes: THREE.Mesh[]
  // How quickly the pair darts towards its target, when wandering
  speed: number
  // When (in ms) the pair next picks a new target, when wandering
  delay: number
  target: Point
  current: Point
}

interface Props {
  // Eyes search around on their own, and only follow the pointer while it moves
  wander?: boolean
}

// How long the eyes keep following the pointer after it stops, when wandering
const POINTER_HOLD_MS = 1500

export const Eyes = ({ wander = false }: Props) => {
  const eyeWrapper = useRef<HTMLDivElement>(null!)
  const { windowWidth } = useWindowSize()

  useEffect(() => {
    const eyeWrapperCurrent = eyeWrapper.current
    let width = eyeWrapperCurrent.clientWidth
    let height = eyeWrapperCurrent.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      width / -64,
      width / 64,
      height / 64,
      height / -64,
      10,
      10000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.SphereGeometry(1, 64, 64)

    const materials = [
      new THREE.MeshBasicMaterial({ map: getTexture('66B5D2') }),
      new THREE.MeshBasicMaterial({ map: getTexture('2C9131') }),
      new THREE.MeshBasicMaterial({ map: getTexture('aab840') }),
      new THREE.MeshBasicMaterial({ map: getTexture('704c2a') }),
      new THREE.MeshBasicMaterial({ map: getTexture('b7bdcf') })
    ]

    camera.position.z = 80

    renderer.setClearColor('#eee')
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    let xTotal = Math.ceil(width / 80)
    const yTotal = Math.ceil(height / 80)

    xTotal = xTotal % 2 !== 0 ? xTotal + 1 : xTotal // Ensure pairs of eyes

    const eyePairs: Eye[] = []

    let eyeColor = materials[Math.floor(Math.random() * materials.length)]
    for (let y = -yTotal / 2; y < yTotal / 2; y++) {
      for (let x = -xTotal / 2; x < xTotal / 2; x = x + 2) {
        eyeColor = materials[Math.floor(Math.random() * materials.length)]

        const leftEye = new THREE.Mesh(geometry, eyeColor)
        leftEye.position.x = x * EYE_SIZE + EYE_SIZE / 2
        leftEye.position.y = y * EYE_SIZE + EYE_SIZE / 2
        leftEye.rotation.x = -Math.PI / 2

        const rightEye = new THREE.Mesh(geometry, eyeColor)
        rightEye.position.x = (x + 1) * EYE_SIZE + EYE_SIZE / 2
        rightEye.position.y = y * EYE_SIZE + EYE_SIZE / 2
        rightEye.rotation.x = -Math.PI / 2

        eyePairs.push({
          speed: 0,
          delay: 0,
          target: { x: width / 2, y: height / 2 },
          current: { x: width / 2, y: height / 2 },
          eyes: [leftEye, rightEye]
        })

        scene.add(leftEye)
        scene.add(rightEye)
      }
    }

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const pos = new THREE.Vector3()

    const lookAt = (eyePair: Eye, x: number, y: number) => {
      pos.setFromMatrixPosition(eyePair.eyes[0].matrixWorld)
      pos.project(camera)
      pos.x = pos.x * (width / 2) + width / 2
      pos.y = -(pos.y * (height / 2)) + height / 2
      pos.z = 0

      eyePair.eyes[0].rotation.z = ((Math.PI * 0.5) / width) * (x - pos.x)
      eyePair.eyes[0].rotation.x =
        -Math.PI / 2 + ((Math.PI * 0.5) / height) * (y - pos.y)

      eyePair.eyes[1].rotation.z = ((Math.PI * 0.5) / width) * (x - pos.x)
      eyePair.eyes[1].rotation.x =
        -Math.PI / 2 + ((Math.PI * 0.5) / height) * (y - pos.y)
    }

    const handleAnimation = (x: number, y: number) => {
      requestAnimationFrame(() => {
        for (let i = 0; i < eyePairs.length; i++) {
          lookAt(eyePairs[i], x, y)
        }

        renderScene()
      })
    }

    // Constant motion is opt-out for visitors who ask their OS for less of it
    const isWandering =
      wander && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let pointer: (Point & { time: number }) | null = null
    let wanderFrame = 0

    const handleWander = (now: number) => {
      const isFollowing =
        pointer !== null && now - pointer.time < POINTER_HOLD_MS

      for (let i = 0; i < eyePairs.length; i++) {
        const eyePair = eyePairs[i]

        // Each pair searches its own spot, a little beyond the screen edges
        if (!isFollowing && now > eyePair.delay) {
          eyePair.target = {
            x: (Math.random() * 2 - 0.5) * width,
            y: (Math.random() * 2 - 0.5) * height
          }
          eyePair.delay = now + 400 + Math.random() * 1600
          eyePair.speed = 0.08 + Math.random() * 0.12
        }

        const target = isFollowing && pointer ? pointer : eyePair.target
        const speed = isFollowing ? 0.25 : eyePair.speed

        eyePair.current.x += (target.x - eyePair.current.x) * speed
        eyePair.current.y += (target.y - eyePair.current.y) * speed

        lookAt(eyePair, eyePair.current.x, eyePair.current.y)
      }

      renderScene()
      wanderFrame = requestAnimationFrame(handleWander)
    }

    const handlePointer = (x: number, y: number) => {
      if (isWandering) {
        pointer = { x, y, time: performance.now() }
      } else {
        handleAnimation(x, y)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handlePointer(e.screenX - 80, e.screenY - 80)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointer(e.touches[0].pageX - 60, e.touches[0].pageY)
      }
    }

    renderScene()

    if (isWandering) {
      wanderFrame = requestAnimationFrame(handleWander)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    eyeWrapperCurrent.appendChild(renderer.domElement)

    return () => {
      cancelAnimationFrame(wanderFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      eyeWrapperCurrent.removeChild(renderer.domElement)
      geometry.dispose()

      for (let i = 0; i < eyePairs.length; i++) {
        scene.remove(eyePairs[i].eyes[0])
        scene.remove(eyePairs[i].eyes[1])
      }

      for (let i = 0; i < materials.length; i++) {
        materials[i].map?.dispose()
        materials[i].dispose()
      }

      renderer.dispose()
    }
  }, [windowWidth, wander])

  return <div className={styles.eyes} ref={eyeWrapper} />
}
