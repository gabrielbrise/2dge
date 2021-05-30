import Projectile from "./Projectile";
import Bullet from "./assets/bullets/Bullet.png";
import Sprite from "./Sprite";
import { ICanvas } from "./Canvas";
import { calculateDirectionVector, isMoving } from "./utils/coordinates";

const uuidv4 = require("uuid/v4");

interface ICharacter {
  key: any;
}

interface Character extends ICharacter {
  id: string;
}

class Character extends Sprite {
  constructor(width: number, height: number, src: string[], canvas: ICanvas) {
    super({
      width,
      height,
      src,
      animationTime: 600,
      posX: 150,
      posY: 150,
      canvas,
    });
    this.key = canvas.keyboard;
    this.key.addAction("click", this.action);
    this.id = uuidv4();
  }

  update = () => {
    if (isMoving(this.key)) {
      this.move();
    }
    this.draw();
  };

  action = (e: MouseEvent) => {
    const bullet = new Projectile({
      width: 8,
      height: 8,
      src: [Bullet],
      canvas: this.canvas,
      origin: [this.posX, this.posY],
      target: [e.x, e.y],
      velocity: 10,
    });

    this.canvas.add(bullet);
  };

  move = () => {
    const vector = calculateDirectionVector(this.key);
    this.animate();
    this.posX = this.posX + vector.x;
    this.posY = this.posY + vector.y;
  };
}

export default Character;
