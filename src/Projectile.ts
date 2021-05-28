import { targetAngle } from "./utils/coordinates";

export default class Projectile {
  width: number;
  height: number;
  velocity: number;
  origin: number[];
  target: number[];
  canvas: any;
  src: string[];
  image: HTMLImageElement;
  animationTime: number;
  animationFrames: number;
  posX: number;
  posY: number;
  key: any;
  targetAngle: number;
  constructor(
    width: number,
    height: number,
    src: string[],
    canvas: any,
    velocity: number,
    origin: number[],
    target: number[]
  ) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.src = src;
    this.image.src = this.src[0];
    this.animationTime = 600;
    this.animationFrames = src.length;
    this.velocity = velocity;
    this.origin = origin;
    this.target = target;
    this.canvas = canvas;
    this.posX = origin[0];
    this.posY = origin[1];
    this.targetAngle = targetAngle(origin, target);
    this.key = this.canvas.keyboard;
  }

  draw() {
    this.animate();
    this.posX = this.posX + this.move().x;
    this.posY = this.posY + this.move().y;

    this.canvas.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  animate() {
    const frame = Math.floor(
      ((this.canvas.timestamp + this.animationTime) /
        (this.animationTime / this.animationFrames)) %
        this.animationFrames
    );
    this.image.src = this.src[frame];
  }

  move() {
    function moveStep(origin: number[], target: number[], velocity: number) {
      const tAngle = targetAngle(origin, target);
      const stepX = Math.cos(tAngle) * velocity;
      const stepY = Math.sin(tAngle) * velocity;
      return [stepX, stepY];
    }

    const ms = moveStep(this.origin, this.target, this.velocity);

    return {
      x: ms[0],
      y: ms[1],
      isMoving: true,
    };
  }
}
