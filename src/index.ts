import Canvas from './singletons/Canvas'
import Character from './Character'
import RedGirl from './assets/characters/RedGirl'
import Rectangle from './Rectangle'

const FPS: number = 60

function init() {
  Canvas.start()
  const canvas = Canvas.get()
  const character = new Character(32, 32, RedGirl, canvas)
  const wall = new Rectangle({
    width: 200,
    height: 20,
    posX: 300,
    posY: 300,
    canvas,
  })
  canvas.add(wall)
  canvas.add(character)
  canvas.draw(0)
}

// function timedAnimation(timestamp) {
//   setTimeout(function () {
//     //throttle requestAnimationFrame to 20fps
//     leftPos += 5;
//     CANVAS_ID.style.left = leftPos + "px";
//     requestAnimationFrame(movediv);
//   }, 1000 / FPS);
// }

init()
