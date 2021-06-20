import Canvas, { ICanvas } from './singletons/Canvas'
import { RectangleT } from './constants/types'
import { rectIntersect } from './utils/collision'

export interface CollisionProps {
  collisionRectangles: RectangleT[]
  onCollision?: Function
  id: string
}

export interface ICollision extends CollisionProps {
  canvas: ICanvas
  check: Function
}

interface Collision extends ICollision {}

class Collision {
  constructor({ id, onCollision, collisionRectangles }: CollisionProps) {
    this.onCollision = onCollision
    this.collisionRectangles = collisionRectangles
    this.canvas = Canvas.get()
    this.id = id
  }

  check() {
    this.onCollision &&
      this.collisionRectangles.map((collisionRect) => {
        const filterCollisionableObjects = this.canvas.objects.filter(
          (object) => object.collision
        )
        console.log(this.onCollision, this.collisionRectangles)
        filterCollisionableObjects.map((object) => {
          object.collision.collisionRectangles.map(
            (objectColRect: RectangleT) => {
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
            }
          )
        })
      })
  }
}

export default Collision
