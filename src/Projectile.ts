import { isOnScreen, moveStep, targetAngle } from "./utils/coordinates";
import Sprite from "./Sprite";
import { ICanvas } from "./Canvas";
import { Coordinates } from "./constants/types";

const uuidv4 = require("uuid/v4");

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
  id: string;
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
    this.id = uuidv4();
  }

  update = () => {
    this.colision();
    this.move();
    this.animate();
    this.draw();
  };

  move = () => {
    const [x, y] = moveStep(this.origin, this.target, this.velocity);
    this.posX = this.posX + x;
    this.posY = this.posY + y;
  };

  colision = () => {
    if (!isOnScreen([this.posX, this.posY], this.canvas)) {
      this.destroy();
    }
  };

  destroy = () => {
    this.canvas.remove(this.id);
  };
}

export default Projectile;
