export type IconPaddingOptions = 'none' | 'default' | 'small'

export interface Scene {
  new (): any
  add: (arg: any) => void
}

export interface Renderer {
  new (): any
  width: number
  height: number
  setSize: (width: number, height: number) => void
  render: (scene: Scene, callback?: () => void) => void
  clear: () => void
}

export interface Light {
  new (ambient: string, spotlight: string): any
  zOffset: number
  setPosition: (x: number, y: number, z: number) => void
}

export interface Plane {
  new (width: number, height: number, howmany: number): any
  render(width: number, height: number, howmany: number): any
}

export interface Material {
  new (ambient: string, diffuse: string): any
}

export interface Mesh {
  new (geometry: Plane, material: Material): any
  width: number
  height: number
}

export interface ContentProps {
  title?: string
  images?: string[]
}
