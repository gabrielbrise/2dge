import Projectile from './Projectile'
import Bullet from '../assets/bullets/Bullet.png'
import Sprite from '../../src/Sprite'
import { calculateDirectionVector, isMoving } from '../../src/utils/coordinates'
import GameObject from '../../src/GameObject'
import Position from '../../src/Position'
import {
  RedGirlIdle,
  RedGirlLeft,
  RedGirlRight,
  RedGirlUp,
} from '../assets/characters/RedGirl'

interface ICharacter {
  key: any
}

interface Character extends ICharacter {}

class Character extends GameObject {
  constructor(width: number, height: number, src: string) {
    super()
    this.key = this.canvas.keyboard
    this.key.addAction('click', this.action)
    this.position = new Position({ x: 150, y: 150 })
    this.sprite = new Sprite({
      width,
      height,
      src,
      animationTime: 600,
      position: this.position,
      frames: [
        { x: 0, y: 0, width: 16, height: 16 },
        { x: 16, y: 0, width: 16, height: 16 },
        { x: 16 * 2, y: 0, width: 16, height: 16 },
        { x: 16 * 3, y: 0, width: 16, height: 16 },
        { x: 16 * 4, y: 0, width: 16, height: 16 },
        { x: 16 * 5, y: 0, width: 16, height: 16 },
        { x: 16 * 6, y: 0, width: 16, height: 16 },
      ],
    })
  }

  update = () => {
    if (isMoving(this.key)) {
      this.move()
    }
    this.sprite.draw()
    this.sprite.animate()
  }

  action = (e: MouseEvent) => {
    const bullet = new Projectile({
      width: 4,
      height: 4,
      src: Bullet,
      origin: [this.position.x, this.position.y],
      target: [e.x, e.y],
      velocity: 10,
    })

    this.canvas.add(bullet)
  }

  move = () => {
    const vector = calculateDirectionVector(this.key)
    console.log(vector)
    if (vector.x === -1) this.sprite.image.src = RedGirlLeft
    if (vector.x === 1) this.sprite.image.src = RedGirlRight
    if (vector.y === -1) this.sprite.image.src = RedGirlUp
    if (vector.y === 1 && vector.x === 0) this.sprite.image.src = RedGirlIdle
    // this.sprite.src =
    this.position.x = this.position.x + vector.x * 2
    this.position.y = this.position.y + vector.y * 2
  }
}

export default Character
