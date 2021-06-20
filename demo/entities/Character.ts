import Projectile from './Projectile'
import Bullet from '../assets/bullets/Bullet.png'
import Sprite from '../../src/Sprite'
import { ICanvas } from '../../src/singletons/Canvas'
import { calculateDirectionVector, isMoving } from '../../src/utils/coordinates'
import GameObject from '../../src/GameObject'

const uuidv4 = require('uuid/v4')

interface ICharacter {
  key: any
}

interface Character extends ICharacter {
  id: string
}

class Character extends GameObject {
  constructor(width: number, height: number, src: string[], canvas: ICanvas) {
    super()
    this.key = canvas.keyboard
    this.key.addAction('click', this.action)
    this.id = uuidv4()
    this.sprite = new Sprite({
      width,
      height,
      src,
      animationTime: 600,
      posX: 150,
      posY: 150,
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
      origin: [this.sprite.posX, this.sprite.posY],
      target: [e.x, e.y],
      velocity: 10,
    })

    this.canvas.add(bullet)
  }

  move = () => {
    const vector = calculateDirectionVector(this.key)
    const newPosX = this.sprite.posX + vector.x
    const newPosY = this.sprite.posY + vector.y
    this.sprite.posX = newPosX
    this.sprite.posY = newPosY
    this.sprite.animate()
  }
}

export default Character
