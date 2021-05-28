import Projectile from "./Projectile";
import Bullet from "./assets/bullets/Bullet.png";

export default class Character {
  width: number;
  height: number;
  posX: number;
  posY: number;
  src: string[];
  image: HTMLImageElement;
  canvas: any;
  key: any;
  animationTime: number;
  animationFrames: number;
  constructor(width: number, height: number, src: string[], canvas: any) {
    this.width = width;
    this.height = height;
    this.src = src;
    this.image = new Image();
    this.image.src = this.src[0];
    this.canvas = canvas;
    this.posX = 150;
    this.posY = 150;
    this.animationTime = 600;
    this.animationFrames = src.length;
    this.key = canvas.keyboard;
    this.key.addAction("click", this.action);
  }
  draw() {
    if (this.move().isMoving) {
      this.animate();
      this.posX = this.posX + this.move().x;
      this.posY = this.posY + this.move().y;
    }

    this.canvas.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  action = (e: MouseEvent) => {
    const bullet = new Projectile(
      8,
      8,
      [Bullet],
      this.canvas,
      10,
      [this.posX, this.posY],
      [e.x, e.y]
    );

    this.canvas.add(bullet);
  };

  animate() {
    const frame = Math.floor(
      ((this.canvas.timestamp + this.animationTime) /
        (this.animationTime / this.animationFrames)) %
        this.animationFrames
    );
    this.image.src = this.src[frame];
  }

  move() {
    if (this.key.w | this.key.s | this.key.a | this.key.d) {
      const wKey = this.key.w ? -1 : 0;
      const sKey = this.key.s ? 1 : 0;
      const dKey = this.key.d ? 1 : 0;
      const aKey = this.key.a ? -1 : 0;
      const xDelta = aKey + dKey;
      const yDelta = wKey + sKey;
      return {
        x: xDelta,
        y: yDelta,
        isMoving: true,
      };
    }
    return {
      x: 0,
      y: 0,
      isMoving: false,
    };
  }
}
