import { ICanvas } from "./Canvas";

const uuidv4 = require("uuid/v4");

interface GameObjectProps {
  canvas: ICanvas;
}

interface GameObject extends GameObjectProps {
  id: string;
}

class GameObject {
  constructor(canvas: ICanvas) {
    this.canvas = canvas;
    this.id = uuidv4();
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    this.canvas.remove(this.id);
  }
}

export default GameObject;
