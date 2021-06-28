import GameObject from '2dge/GameObject'
import Canvas, { ICanvas } from '2dge/singletons/Canvas'
import Status, { IStatus } from '2dge/singletons/Status'

interface IScore {
  status: IStatus
  canvas: ICanvas
}

interface Score extends IScore {}

class Score extends GameObject {
  constructor() {
    super()
    this.status = Status.get()
    this.canvas = Canvas.get()
    this.status.score = 0
    this.layer = 999
    this.canvas.ctx.font = '30px Arial'
  }
  update() {
    this.draw()
  }
  draw() {
    this.canvas.ctx.fillStyle = 'white'
    this.canvas.ctx.fillText(`Score: ${this.status.score}`, 10, 30)
  }
}

export default Score
