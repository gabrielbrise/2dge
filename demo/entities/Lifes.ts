import GameObject from '2dge/GameObject'
import Position from '2dge/Position'
import Canvas, { ICanvas } from '2dge/singletons/Canvas'
import Status, { IStatus } from '2dge/singletons/Status'
import { Heart } from 'demo/assets/gui/lifes'

interface ILifes {
  status: IStatus
  canvas: ICanvas
}

interface Lifes extends ILifes {}

class Lifes extends GameObject {
  constructor() {
    super()
    this.status = Status.get()
    this.canvas = Canvas.get()
    this.position = new Position({ x: 10, y: 50 })
    this.layer = 9999
    this.status.lifes = 6
    this.status.maxLifes = 6
    this.image = new Image()
    this.image.src = Heart
    this.hearts = {
      full: { x: 0, y: 0, width: 8, height: 8 },
      half: { x: 8, y: 0, width: 8, height: 8 },
      empty: { x: 16, y: 0, width: 8, height: 8 },
    }
  }
  update() {
    this.draw()
  }
  draw() {
    Array(this.status.maxLifes / 2)
      .fill(null)
      .map((_, index) => {
        if (this.status.lifes / 2 >= index + 1) {
          this.canvas.ctx.drawImage(
            this.image,
            this.hearts.full.x,
            this.hearts.full.y,
            this.hearts.full.width,
            this.hearts.full.height,
            this.position.x + 16 * index + 4 * index,
            this.position.y,
            16,
            16
          )
          return
        }
        if (
          this.status.lifes / 2 < index + 1 &&
          this.status.lifes / 2 > index
        ) {
          this.canvas.ctx.drawImage(
            this.image,
            this.hearts.half.x,
            this.hearts.half.y,
            this.hearts.half.width,
            this.hearts.half.height,
            this.position.x + 16 * index + 4 * index,
            this.position.y,
            16,
            16
          )
          return
        }
        if (this.status.lifes / 2 < index + 1) {
          this.canvas.ctx.drawImage(
            this.image,
            this.hearts.empty.x,
            this.hearts.empty.y,
            this.hearts.empty.width,
            this.hearts.empty.height,
            this.position.x + 16 * index + 4 * index,
            this.position.y,
            16,
            16
          )
          return
        }
      })
  }
}

export default Lifes
