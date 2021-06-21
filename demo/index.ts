import Canvas from '../src/singletons/Canvas'
import Character from './entities/Character'
import RedGirl from './assets/characters/RedGirl'
import Wall from './entities/Wall'

function init() {
  Canvas.start()
  const canvas = Canvas.get()
  const character = new Character(32, 32, RedGirl)
  const wall = new Wall({
    width: 200,
    height: 20,
    position: { x: 300, y: 300 },
  })
  canvas.add(wall)
  canvas.add(character)
  canvas.draw(0)
}

init()
