import { IPosition } from './Position'
import Canvas, { ICanvas } from './singletons/Canvas'

export interface SpriteProps {
  width: number
  height: number
  src: string[]
  animationTime: number
  position: IPosition
}

interface Sprite extends SpriteProps {
  image: HTMLImageElement
  animationFrames: number
  canvas: ICanvas
}

class Sprite {
  constructor({ width, height, src, animationTime, position }: SpriteProps) {
    this.width = width
    this.height = height
    this.src = src
    this.position = position
    this.image = new Image()
    this.image.src = this.src[0]
    this.canvas = Canvas.get()
    this.animationFrames = src.length
    this.animationTime = animationTime
  }

  draw() {
    this.canvas.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  animate() {
    const frame = Math.floor(
      ((this.canvas.timestamp + this.animationTime) /
        (this.animationTime / this.animationFrames)) %
        this.animationFrames
    )
    this.image.src = this.src[frame]
  }
}

export default Sprite
