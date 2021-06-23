import Canvas from 'singletons/Canvas'

const uuidv4 = require('uuid/v4')

interface GameObjectProps {}

interface GameObject extends GameObjectProps {
  id: string
  tags: string[]
  layer: number
  [arg: string]: any
}

class GameObject {
  constructor() {
    this.canvas = Canvas.get()
    this.id = uuidv4()
    this.destroy = this.destroy.bind(this)
    this.tags = []
    this.layer = 0
  }

  destroy() {
    this.canvas.remove(this.id)
  }
}

export default GameObject
