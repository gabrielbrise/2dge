import Keyboard from "./Keyboard";

export interface ICanvas {
  height: number;
  width: number;
  id: string;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  keyboard: any;
  timestamp: DOMHighResTimeStamp;
  objects: any[];
}

interface Canvas extends ICanvas {}

class Canvas {
  constructor(width: number = 640, height: number = 480, objects: any[] = []) {
    this.height = height;
    this.width = width;
    this.id = "2dge-canvas";
    this.inject();
    this.element = document.getElementById(this.id) as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d");
    this.keyboard = new Keyboard();
    this.timestamp = 0;
    this.objects = objects;
  }

  draw(timestamp: DOMHighResTimeStamp) {
    this.timestamp = timestamp;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.restore();

    this.objects.forEach((object) => {
      object.draw();
    });

    window.requestAnimationFrame((timestamp) => this.draw(timestamp));
  }

  inject() {
    let c = document.createElement("canvas");
    c.width = this.width;
    c.height = this.height;
    c.id = this.id;
    document.body.appendChild(c);
  }

  add(newObject: any) {
    this.objects.push(newObject);
  }
}

export default Canvas;
