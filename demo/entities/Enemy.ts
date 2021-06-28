import Sprite from '2dge/Sprite'
import { isOnScreen } from '2dge/utils/coordinates'
import GameObject from '2dge/GameObject'
import Position from '2dge/Position'
import { randomIntFromInterval } from '2dge/utils/numbers'
import Collision from '2dge/Collision'
import { Coordinates } from 'constants/types'
import Status from '2dge/singletons/Status'

interface IEnemy {}

interface Enemy extends IEnemy {}

class Enemy extends GameObject {
  constructor(
    width: number,
    height: number,
    src: string,
    origin: Coordinates,
    lifes: number
  ) {
    super()
    this.status = Status.get()
    this.position = new Position({ x: origin[0], y: origin[1] })
    this.nextPosition = new Position({ x: origin[0], y: origin[1] })
    this.nextCollision = new Collision({
      id: this.id,
      onCollision: this.onCollision,
      collisionRectangles: [{ position: this.nextPosition, width, height }],
    })
    this.sprite = new Sprite({
      width,
      height,
      src,
      animationTime: 600,
      position: this.position,
      frames: [
        { x: 0, y: 0, width: 16, height: 16 },
        { x: 16, y: 0, width: 16, height: 16 },
        { x: 16 * 2, y: 0, width: 16, height: 16 },
        { x: 16 * 3, y: 0, width: 16, height: 16 },
        { x: 16 * 4, y: 0, width: 16, height: 16 },
        { x: 16 * 5, y: 0, width: 16, height: 16 },
        { x: 16 * 6, y: 0, width: 16, height: 16 },
      ],
    })
    this.tags = ['enemy']
    this.lifes = lifes
    this.walkingDuration = 200
    this.vector = this.randomDirection()
    this.collision = new Collision({
      id: this.id,
      onCollision: this.onCollision,
      collisionRectangles: [{ position: this.position, width, height }],
    })
  }

  update = () => {
    this.isAlive()
    const collision = this.collision.check()
    if (collision.length === 0) {
      this.move()
    }
    this.sprite.animate()

    if (this.lifes > 1) {
      this.canvas.ctx.filter = `hue-rotate(${this.lifes * 90}deg)`
    }

    this.sprite.draw()
    this.canvas.filterReset()
  }

  onCollision = (object: GameObject, target: GameObject) => {
    if (target.tags.includes('bullet')) {
    }
  }

  isAlive() {
    if (this.lifes <= 0) {
      this.destroy()
      ++this.status.score
    }
  }

  randomDirection = () => {
    const value = {
      x: randomIntFromInterval(-1, 1),
      y: randomIntFromInterval(-1, 1),
    }
    return value
  }

  move = () => {
    if (this.walkingDuration <= 0) {
      this.vector = this.randomDirection()
      this.walkingDuration = 200
    }
    this.nextPosition.x = this.position.x + this.vector.x
    this.nextPosition.y = this.position.y + this.vector.y

    if (
      isOnScreen([this.nextPosition.x, this.nextPosition.y], this.canvas) &&
      isOnScreen(
        [
          this.nextPosition.x + this.sprite.width,
          this.nextPosition.y + this.sprite.height,
        ],
        this.canvas
      ) &&
      !this.nextCollision.check().length
    ) {
      this.position.x = this.nextPosition.x
      this.position.y = this.nextPosition.y
    }
    this.walkingDuration = this.walkingDuration - 1
  }
}

export default Enemy
