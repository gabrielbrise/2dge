import Canvas from './singletons/Canvas'

const uuidv4 = require('uuid/v4')

interface GameObjectProps {}

interface GameObject extends GameObjectProps {
  id: string
  [arg: string]: any
}

class GameObject {
  constructor() {
    this.canvas = Canvas.get()
    this.id = uuidv4()
    this.destroy = this.destroy.bind(this)
    this.tags = []
  }

  destroy() {
    this.canvas.remove(this.id)
  }
}

export default GameObject
