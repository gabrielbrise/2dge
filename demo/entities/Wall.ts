import Collision, { ICollision } from '2dge/Collision'
import GameObject from '2dge/GameObject'
import Position from '2dge/Position'
import Rectangle, { RectangleProps } from '2dge/Rectangle'

interface WallProps extends RectangleProps {}

interface IWall extends WallProps {}

interface Wall extends IWall {
  collision: ICollision
}

class Wall extends GameObject {
  constructor({ width, height, position, stroke, fill }: RectangleProps) {
    super()
    this.position = new Position({ ...position })
    this.collision = new Collision({
      collisionRectangles: [{ width, height, position: this.position }],
      id: this.id,
    })
    this.rectangle = new Rectangle({ width, height, position, stroke, fill })
    this.tags = ['wall']
    this.layer = 1
  }
  update() {
    this.rectangle.draw()
  }
}

export default Wall
