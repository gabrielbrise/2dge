import { isOnScreen, moveStep, targetAngle } from '../../src/utils/coordinates'
import Sprite from '../../src/Sprite'
import Canvas from '../../src/singletons/Canvas'
import { Coordinates } from '../../src/constants/types'
import Collision, { ICollision } from '../../src/Collision'
import GameObject from '../../src/GameObject'

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
    this.sprite = new Sprite({
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
      id: this.id,
    })
  }

  update = () => {
    if (!isOnScreen([this.sprite.posX, this.sprite.posY], this.canvas)) {
      this.destroy()
    }
    this.collision.collisionRectangles = [
      {
        posX: this.sprite.posX,
        posY: this.sprite.posY,
        width: this.sprite.width,
        height: this.sprite.height,
      },
    ]
    this.collision.check()
    this.move()
    this.sprite.animate()
    this.sprite.draw()
  }

  move = () => {
    const [x, y] = moveStep(this.origin, this.target, this.velocity)
    this.sprite.posX = this.sprite.posX + x
    this.sprite.posY = this.sprite.posY + y
  }

  destroy = () => {
    this.canvas.remove(this.id)
  }
}

export default Projectile
