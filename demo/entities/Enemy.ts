import Projectile from './Projectile'
import Bullet from '../assets/bullets/Bullet.png'
import Sprite from '../../src/Sprite'
import {
  calculateDirectionVector,
  isMoving,
  isOnScreen,
} from '../../src/utils/coordinates'
import GameObject from '../../src/GameObject'
import Position from '../../src/Position'
import { randomIntFromInterval } from '../../src/utils/numbers'
import Collision from '../../src/Collision'
import { Coordinates } from '../../src/constants/types'

interface IEnemy {}

interface Enemy extends IEnemy {}

class Enemy extends GameObject {
  constructor(width: number, height: number, src: string, origin: Coordinates) {
    super()
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
    this.walkingDuration = 200
    this.vector = this.randomDirection()
    this.collision = new Collision({
      id: this.id,
      onCollision: this.onCollision,
      collisionRectangles: [{ position: this.position, width, height }],
    })
  }

  update = () => {
    const collision = this.collision.check()
    if (collision.length === 0) {
      this.move()
    }

    this.sprite.animate()
    this.sprite.draw()
  }

  onCollision = (object, target) => {
    if (target.tags.includes('bullet')) {
      this.destroy()
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
