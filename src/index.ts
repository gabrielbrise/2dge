import Canvas from "./Canvas";
import Character from "./Character";
import RedGirl from "./assets/characters/RedGirl";

const FPS: number = 60;

function init() {
  let canvas: Canvas;
  canvas = new Canvas();
  const character = new Character(32, 32, RedGirl, canvas);
  canvas.add(character);
  canvas.draw(0);
}

// function timedAnimation(timestamp) {
//   setTimeout(function () {
//     //throttle requestAnimationFrame to 20fps
//     leftPos += 5;
//     CANVAS_ID.style.left = leftPos + "px";
//     requestAnimationFrame(movediv);
//   }, 1000 / FPS);
// }

init();
