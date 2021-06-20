import { ICanvas } from './Canvas'
import Collision from './Collision'
import { RectangleT } from './constants/types'

interface RectangleProps {
  width: number
  height: number
  posX: number
  posY: number
  onCollision?: Function
  canvas: ICanvas
}

interface Rectangle extends RectangleProps {}

class Rectangle extends Collision {
  constructor({
    width,
    height,
    posX,
    posY,
    onCollision,
    canvas,
  }: RectangleProps) {
    super({
      onCollision,
      collisionRectangles: [{ posX, posY, width, height }],
    })
    this.width = width
    this.height = height
    this.posX = posX
    this.posY = posY
  }

  update() {
    this.draw()
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
