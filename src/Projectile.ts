import { isOnScreen, moveStep, targetAngle } from './utils/coordinates'
import Sprite from './Sprite'
import Canvas from './singletons/Canvas'
import { Coordinates } from './constants/types'
import Collision, { ICollision } from './Collision'

const uuidv4 = require('uuid/v4')

interface ProjectileProps {
  width: number
  height: number
  src: string[]
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

class Projectile extends Sprite {
  constructor({
    width,
    height,
    src,
    velocity,
    origin,
    target,
  }: ProjectileProps) {
    super({
      width,
      height,
      src,
      animationTime: 600,
      posX: origin[0],
      posY: origin[1],
    })
    this.velocity = velocity
    this.targetAngle = targetAngle(origin, target)
    this.key = Canvas.get().keyboard
    this.origin = origin
    this.target = target
    this.id = uuidv4()
    this.collision = new Collision({
      onCollision: (id1: string, id2: string) => {
        console.log(id1, id2)
        this.destroy()
      },
      collisionRectangles: [
        { posX: origin[0], posY: origin[1], width, height },
      ],
    })
  }

  update = () => {
    if (!isOnScreen([this.posX, this.posY], this.canvas)) {
      this.destroy()
    }
    this.collision.collisionRectangles = [
      {
        posX: this.posX,
        posY: this.posY,
        width: this.width,
        height: this.height,
      },
    ]
    this.collision.check()
    this.move()
    this.animate()
    this.draw()
  }

  move = () => {
    const [x, y] = moveStep(this.origin, this.target, this.velocity)
    this.posX = this.posX + x
    this.posY = this.posY + y
  }

  destroy = () => {
    this.canvas.remove(this.id)
  }
}

export default Projectile
