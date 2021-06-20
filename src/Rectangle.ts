import Canvas, { ICanvas } from './singletons/Canvas'

export interface RectangleProps {
  width: number
  height: number
  posX: number
  posY: number
}

interface IRectangle extends RectangleProps {
  canvas: ICanvas
}

interface Rectangle extends IRectangle {}

class Rectangle {
  constructor({ width, height, posX, posY }: RectangleProps) {
    this.width = width
    this.height = height
    this.posX = posX
    this.posY = posY
    this.canvas = Canvas.get()
  }

  draw() {
    this.canvas.ctx.beginPath()
    this.canvas.ctx.lineWidth = 3
    this.canvas.ctx.strokeStyle = 'white'
    this.canvas.ctx.fillStyle = 'black'
    this.canvas.ctx.rect(this.posX, this.posY, this.width, this.height)
    this.canvas.ctx.stroke()
    this.canvas.ctx.fill()
  }
}

export default Rectangle
