export type IconPaddingOptions = 'none' | 'default' | 'small'

export interface SceneProps {
  new (): any
  add: (arg: any) => void
}

export interface RendererProps {
  new (): any
  width: number
  height: number
  setSize: (width: number, height: number) => void
  render: (scene: SceneProps, callback?: () => void) => void
  clear: () => void
}

export interface LightProps {
  new (ambient: string, spotlight: string): any
  zOffset: number
  setPosition: (x: number, y: number, z: number) => void
}

export interface PlaneProps {
  new (width: number, height: number, howmany: number): any
  render(width: number, height: number, howmany: number): any
}

export interface MaterialProps {
  new (ambient: string, diffuse: string): any
}

export interface MeshProps {
  new (geometry: PlaneProps, material: MaterialProps): any
  width: number
  height: number
}

export interface ContentProps {
  title?: string
  images?: string[]
}

export interface rgb {
  r: number
  g: number
  b: number
}
