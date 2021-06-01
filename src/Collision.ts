import { ICanvas } from './Canvas'
import { RectangleT } from './constants/types'
import GameObject from './GameObject'
import { rectIntersect } from './utils/collision'

interface CollisionProps {
  canvas: ICanvas
  collisionRectangles: RectangleT[]
  onCollision?: Function
}

interface Collision extends CollisionProps {
  id: string
}

class Collision extends GameObject {
  constructor({ onCollision, collisionRectangles, canvas }: CollisionProps) {
    super(canvas)
    this.onCollision = onCollision
    this.collisionRectangles = collisionRectangles
  }

  colision() {
    this.onCollision &&
      this.collisionRectangles.map((collisionRect) => {
        this.canvas.objects.map((object) => {
          object.colisionRectangles.map((objectColRect: RectangleT) => {
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
