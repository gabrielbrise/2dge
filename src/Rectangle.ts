import { IPosition } from './Position'
import Canvas, { ICanvas } from './singletons/Canvas'

export interface RectangleProps {
  width: number
  height: number
  position: IPosition
  stroke?: { width: number; color: string }
  fill: string
}

interface IRectangle extends RectangleProps {
  canvas: ICanvas
}

interface Rectangle extends IRectangle {}

class Rectangle {
  constructor({ width, height, position, stroke, fill }: RectangleProps) {
    this.width = width
    this.height = height
    this.position = position
    this.canvas = Canvas.get()
    this.stroke = stroke
    this.fill = fill
  }

  draw() {
    this.canvas.ctx.beginPath()
    if (this.stroke) {
      this.canvas.ctx.lineWidth = this.stroke.width
      this.canvas.ctx.strokeStyle = this.stroke.color
      this.canvas.ctx.stroke()
    }
    this.canvas.ctx.fillStyle = this.fill
    this.canvas.ctx.rect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
    this.canvas.ctx.fill()
  }
}

export default Rectangle
