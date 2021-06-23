import { isOnScreen, moveStep, targetAngle } from '../../src/utils/coordinates'
import Sprite from '../../src/Sprite'
import Canvas from '../../src/singletons/Canvas'
import { Coordinates } from '../../src/constants/types'
import Collision, { ICollision } from '../../src/Collision'
import GameObject from '../../src/GameObject'
import Position from '../../src/Position'

const uuidv4 = require('uuid/v4')

interface ProjectileProps {
  width: number
  height: number
  src: string
  velocity: number
  origin: Coordinates
  target: Coordinates
}

interface Projectile extends ProjectileProps {
  id: string
  targetAngle: number
  key: any
  collision: ICollision
}

class Projectile extends GameObject {
  constructor({
    width,
    height,
    src,
    velocity,
    origin,
    target,
  }: ProjectileProps) {
    super()
    this.position = new Position({ x: origin[0], y: origin[1] })
    this.sprite = new Sprite({
      width,
      height,
      src,
      animationTime: 600,
      position: this.position,
      frames: [{ x: 0, y: 0, width, height }],
    })
    this.velocity = velocity
    this.targetAngle = targetAngle(origin, target)
    this.key = this.canvas.keyboard
    this.origin = origin
    this.target = target
    this.tags = ['bullet']
    this.id = uuidv4()
    this.collision = new Collision({
      onCollision: () => {
        this.destroy()
      },
      collisionRectangles: [{ position: this.position, width, height }],
      id: this.id,
    })
  }

  update = () => {
    if (!isOnScreen([this.position.x, this.position.y], this.canvas)) {
      this.destroy()
    }
    this.collision.check()
    this.move()
    this.sprite.animate()
    this.sprite.draw()
  }

  move = () => {
    const [x, y] = moveStep(this.origin, this.target, this.velocity)
    this.position.x = this.position.x + x
    this.position.y = this.position.y + y
  }

  destroy = () => {
    this.canvas.remove(this.id)
  }
}

export default Projectile
