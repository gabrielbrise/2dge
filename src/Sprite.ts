import { IPosition } from './Position'
import Canvas, { ICanvas } from 'singletons/Canvas'

export interface SpriteProps {
  width: number
  height: number
  src: string
  animationTime: number
  position: IPosition
  frames?: { x: number; y: number; width: number; height: number }[]
}

interface Sprite extends SpriteProps {
  image: HTMLImageElement
  animationFrames: number
  canvas: ICanvas
  currentFrame: { x: number; y: number; width: number; height: number }
}

class Sprite {
  constructor({
    width,
    height,
    src,
    animationTime,
    position,
    frames,
  }: SpriteProps) {
    this.width = width
    this.height = height
    this.src = src
    this.position = position
    this.image = new Image()
    this.image.src = this.src
    this.canvas = Canvas.get()
    this.animationFrames = src.length
    this.animationTime = animationTime
    this.frames = frames
    this.currentFrame = frames[0]
    this.canvas.ctx.imageSmoothingEnabled = false
  }

  draw() {
    this.canvas.ctx.drawImage(
      this.image,
      this.currentFrame.x,
      this.currentFrame.y,
      this.currentFrame.width,
      this.currentFrame.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  animate() {
    if (this.frames.length > 0) {
      const frame = Math.floor(
        ((this.canvas.timestamp + this.animationTime) /
          (this.animationTime / this.frames.length)) %
          this.frames.length
      )
      this.currentFrame = this.frames[frame]
    }
  }
}

export default Sprite
