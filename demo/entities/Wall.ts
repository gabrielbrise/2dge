import Collision, { ICollision } from '../../src/Collision'
import GameObject from '../../src/GameObject'
import Rectangle, { RectangleProps } from '../../src/Rectangle'

interface WallProps extends RectangleProps {}

interface IWall extends WallProps {}

interface Wall extends IWall {
  collision: ICollision
}

class Wall extends GameObject {
  constructor({ width, height, posX, posY }: RectangleProps) {
    super()
    this.collision = new Collision({
      collisionRectangles: [{ width, height, posX, posY }],
      id: this.id,
    })
    this.rectangle = new Rectangle({ width, height, posX, posY })
  }
  update() {
    this.rectangle.draw()
  }
}

export default Wall
