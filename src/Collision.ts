import Canvas, { ICanvas } from 'singletons/Canvas'
import { RectangleT } from 'constants/types'
import { rectIntersect } from 'utils/collision'

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
    let collisions: any[] = []
    this.onCollision &&
      this.collisionRectangles.map((collisionRect) => {
        const filterCollisionableObjects = this.canvas.objects.filter(
          (object) => object.collision
        )
        filterCollisionableObjects.map((object) => {
          object.collision.collisionRectangles.map(
            (objectColRect: RectangleT) => {
              if (
                this.id !== object.id &&
                rectIntersect(
                  collisionRect.position.x,
                  collisionRect.position.y,
                  collisionRect.width,
                  collisionRect.height,
                  objectColRect.position.x,
                  objectColRect.position.y,
                  objectColRect.width,
                  objectColRect.height
                )
              ) {
                this.onCollision(this, object)
                collisions.push([this, object])
              }
            }
          )
        })
      })
    return collisions
  }
}

export default Collision
