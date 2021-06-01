import { isOnScreen, moveStep, targetAngle } from './utils/coordinates'
import Sprite from './Sprite'
import { ICanvas } from './Canvas'
import { Coordinates, RectangleT } from './constants/types'
import { rectIntersect } from './utils/collision'

const uuidv4 = require('uuid/v4')

interface ProjectileProps {
  width: number
  height: number
  src: string[]
  canvas: ICanvas
  velocity: number
  origin: Coordinates
  target: Coordinates
}

interface Projectile extends ProjectileProps {
  id: string
  targetAngle: number
  key: any
  onCollision: Function
  collisionRectangles: RectangleT[]
}

class Projectile extends Sprite {
  constructor({
    width,
    height,
    src,
    canvas,
    velocity,
    origin,
    target,
  }: ProjectileProps) {
    super({
      width,
      height,
      src,
      canvas,
      animationTime: 600,
      posX: origin[0],
      posY: origin[1],
    })
    this.velocity = velocity
    this.targetAngle = targetAngle(origin, target)
    this.key = canvas.keyboard
    this.origin = origin
    this.target = target
    this.id = uuidv4()
    this.onCollision = (id1: string, id2: string) => {
      console.log(id1, id2)
      this.destroy()
    }
    this.collisionRectangles = [
      { posX: origin[0], posY: origin[1], width, height },
    ]
  }

  update = () => {
    if (!isOnScreen([this.posX, this.posY], this.canvas)) {
      this.destroy()
    }
    this.collisionRectangles = [
      {
        posX: this.posX,
        posY: this.posY,
        width: this.width,
        height: this.height,
      },
    ]
    this.collision()
    this.move()
    this.animate()
    this.draw()
  }

  move = () => {
    const [x, y] = moveStep(this.origin, this.target, this.velocity)
    this.posX = this.posX + x
    this.posY = this.posY + y
  }

  collision() {
    this.onCollision &&
      this.collisionRectangles.map((collisionRect) => {
        const filterCollisionableObjects = this.canvas.objects.filter(
          (object) => object.collisionRectangles
        )
        filterCollisionableObjects.map((object) => {
          object.collisionRectangles.map((objectColRect: RectangleT) => {
            if (
              this.id !== object.id &&
              rectIntersect(
                collisionRect.posX,
                collisionRect.posY,
                collisionRect.width,
                collisionRect.height,
                objectColRect.posX,
                objectColRect.posY,
                objectColRect.width,
                objectColRect.height
              )
            ) {
              this.onCollision(this.id, object.id)
            }
          })
        })
      })
  }

  destroy = () => {
    this.canvas.remove(this.id)
  }
}

export default Projectile
