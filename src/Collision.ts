import Canvas, { ICanvas } from './singletons/Canvas'
import { RectangleT } from './constants/types'
import { rectIntersect } from './utils/collision'

export interface CollisionProps {
  collisionRectangles: RectangleT[]
  onCollision?: Function
}

export interface ICollision extends CollisionProps {
  id: string
  canvas: ICanvas
  check: Function
}

interface Collision extends ICollision {}

class Collision {
  constructor({ onCollision, collisionRectangles }: CollisionProps) {
    this.onCollision = onCollision
    this.collisionRectangles = collisionRectangles
    this.canvas = Canvas.get()
  }

  check() {
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
}

export default Collision
