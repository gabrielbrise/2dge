import Canvas from '../src/singletons/Canvas'
import Character from './entities/Character'
import { RedGirlIdle } from './assets/characters/RedGirl'
import { SlimeIdle } from './assets/enemies/Slime'
import Wall from './entities/Wall'
import { randomIntFromInterval } from '../src/utils/numbers'
import Enemy from './entities/Enemy'

function init() {
  Canvas.start()
  const canvas = Canvas.get()
  const character = new Character(48, 48, RedGirlIdle)
  const wallCount = 5
  for (var i = 0; i < wallCount; i++) {
    let wall = new Wall({
      width: randomIntFromInterval(10, 100),
      height: randomIntFromInterval(10, 100),
      position: {
        x: randomIntFromInterval(0, canvas.width),
        y: randomIntFromInterval(0, canvas.height),
      },
      fill: '#9cd3db',
    })
    canvas.add(wall)
    // more statements
  }
  for (var i = 0; i < wallCount; i++) {
    let enemy = new Enemy(32, 32, SlimeIdle, [
      randomIntFromInterval(0, canvas.width),
      randomIntFromInterval(0, canvas.height),
    ])
    canvas.add(enemy)
    // more statements
  }
  canvas.add(character)
  canvas.draw(0)
}

init()
