import Projectile from './Projectile'
import Bullet from '../assets/bullets/Bullet.png'
import Sprite from '../../src/Sprite'
import { ICanvas } from '../../src/singletons/Canvas'
import { calculateDirectionVector, isMoving } from '../../src/utils/coordinates'
import GameObject from '../../src/GameObject'
import Position from '../../src/Position'

const uuidv4 = require('uuid/v4')

interface ICharacter {
  key: any
}

interface Character extends ICharacter {
  id: string
}

class Character extends GameObject {
  constructor(width: number, height: number, src: string[]) {
    super()
    this.key = this.canvas.keyboard
    this.key.addAction('click', this.action)
    this.id = uuidv4()
    this.position = new Position({ x: 150, y: 150 })
    this.sprite = new Sprite({
      width,
      height,
      src,
      animationTime: 600,
      position: this.position,
    })
  }

  update = () => {
    if (isMoving(this.key)) {
      this.move()
    }
    this.sprite.draw()
  }

  action = (e: MouseEvent) => {
    const bullet = new Projectile({
      width: 8,
      height: 8,
      src: [Bullet],
      origin: [this.position.x, this.position.y],
      target: [e.x, e.y],
      velocity: 10,
    })

    this.canvas.add(bullet)
  }

  move = () => {
    const vector = calculateDirectionVector(this.key)
    this.position.x = this.position.x + vector.x
    this.position.y = this.position.y + vector.y
    this.sprite.animate()
  }
}

export default Character
