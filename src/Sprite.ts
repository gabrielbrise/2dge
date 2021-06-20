import Canvas, { ICanvas } from './Canvas'

export interface SpriteProps {
  width: number
  height: number
  src: string[]
  animationTime: number
  posX: number
  posY: number
}

interface Sprite extends SpriteProps {
  image: HTMLImageElement
  animationFrames: number
  canvas: ICanvas
}

class Sprite {
  constructor({ width, height, src, animationTime, posX, posY }: SpriteProps) {
    this.width = width
    this.height = height
    this.src = src
    this.posX = posX
    this.posY = posY
    this.image = new Image()
    this.image.src = this.src[0]
    this.canvas = Canvas.get()
    this.animationFrames = src.length
    this.animationTime = animationTime
  }

  draw() {
    this.canvas.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
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
