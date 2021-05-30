import { moveStep, targetAngle } from "./utils/coordinates";
import Sprite from "./Sprite";
import { ICanvas } from "./Canvas";
import { Coordinates } from "./constants/types";

interface ProjectileProps {
  width: number;
  height: number;
  src: string[];
  canvas: ICanvas;
  velocity: number;
  origin: Coordinates;
  target: Coordinates;
}

interface Projectile extends ProjectileProps {
  targetAngle: number;
  key: any;
}

class Projectile extends Sprite {
  constructor({
    width,
    height,
    src,
    canvas,
    velocity,
    origin,
    target,
  }: ProjectileProps) {
    super({
      width,
      height,
      src,
      canvas,
      animationTime: 600,
      posX: origin[0],
      posY: origin[1],
    });
    this.velocity = velocity;
    this.targetAngle = targetAngle(origin, target);
    this.key = canvas.keyboard;
    this.origin = origin;
    this.target = target;
  }

  update = () => {
    this.animate();
    this.posX = this.posX + this.move().x;
    this.posY = this.posY + this.move().y;

    this.draw();
  };

  animate = () => {
    const frame = Math.floor(
      ((this.canvas.timestamp + this.animationTime) /
        (this.animationTime / this.animationFrames)) %
        this.animationFrames
    );
    this.image.src = this.src[frame];
  };

  move = () => {
    console.log(this);
    const ms = moveStep(this.origin, this.target, this.velocity);

    return {
      x: ms[0],
      y: ms[1],
      isMoving: true,
    };
  };
}

export default Projectile;
