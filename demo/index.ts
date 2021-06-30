import Canvas from '2dge/singletons/Canvas'
import Character from './entities/Character'
import { RedGirlIdle } from './assets/characters/RedGirl'
import { SlimeIdle } from './assets/enemies/Slime'
import Wall from './entities/Wall'
import { randomIntFromInterval } from '2dge/utils/numbers'
import Enemy from './entities/Enemy'
import Status from '2dge/singletons/Status'
import Score from './entities/Score'
import Lifes from './entities/Lifes'

function init() {
  Canvas.start()
  Status.start()
  const status = Status.get()
  const lifes = new Lifes()
  const score = new Score()
  const canvas = Canvas.get()
  const character = new Character(48, 48, RedGirlIdle)
  const wallCount = 5
  const enemyCount = 20
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
  for (var i = 0; i < enemyCount; i++) {
    let enemy = new Enemy(
      32,
      32,
      SlimeIdle,
      [
        randomIntFromInterval(0, canvas.width),
        randomIntFromInterval(0, canvas.height),
      ],
      randomIntFromInterval(1, 3)
    )
    canvas.add(enemy)
    // more statements
  }
  canvas.add(score)
  canvas.add(lifes)
  canvas.add(character)
  canvas.draw(0)
}

init()
