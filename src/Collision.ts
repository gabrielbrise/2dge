import Canvas from './Canvas'
import { RectangleT } from './constants/types'
import GameObject from './GameObject'
import { rectIntersect } from './utils/collision'

export interface CollisionProps {
  collisionRectangles: RectangleT[]
  onCollision?: Function
}

interface Collision extends CollisionProps {
  id: string
}

class Collision extends GameObject {
  constructor({ onCollision, collisionRectangles }: CollisionProps) {
    super()
    this.onCollision = onCollision
    this.collisionRectangles = collisionRectangles
  }

  collision() {
    this.onCollision &&
      this.collisionRectangles.map((collisionRect) => {
        Canvas.get().objects.map((object: any) => {
          object.collisionRectangles.map((objectColRect: RectangleT) => {
            if (
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
