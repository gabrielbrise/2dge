import Collision, { ICollision } from '../../src/Collision'
import GameObject from '../../src/GameObject'
import Position from '../../src/Position'
import Rectangle, { RectangleProps } from '../../src/Rectangle'

interface WallProps extends RectangleProps {}

interface IWall extends WallProps {}

interface Wall extends IWall {
  collision: ICollision
}

class Wall extends GameObject {
  constructor({ width, height, position }: RectangleProps) {
    super()
    this.position = new Position({ ...position })
    this.collision = new Collision({
      collisionRectangles: [{ width, height, position: this.position }],
      id: this.id,
    })
    this.rectangle = new Rectangle({ width, height, position })
  }
  update() {
    this.rectangle.draw()
  }
}

export default Wall
