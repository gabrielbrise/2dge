import Keyboard from "./Keyboard";

export default class Canvas {
  height: number;
  width: number;
  id: string;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  keyboard: any;
  timestamp: DOMHighResTimeStamp;
  objects: any[];
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
    //   ctx.globalCompositeOperation = "destination-over";
    //   ctx.clearRect(0, 0, 300, 300); // clear canvas

    //   ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    //   ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
    //   ctx.save();
    //   ctx.translate(150, 150);

    //   // Earth
    //   var time = new Date();
    //   ctx.rotate(
    //     ((2 * Math.PI) / 60) * time.getSeconds() +
    //       ((2 * Math.PI) / 60000) * time.getMilliseconds()
    //   );
    //   ctx.translate(105, 0);
    //   ctx.fillRect(0, -12, 40, 24); // Shadow
    //   ctx.drawImage(earth, -12, -12);

    //   // Moon
    //   ctx.save();
    //   ctx.rotate(
    //     ((2 * Math.PI) / 6) * time.getSeconds() +
    //       ((2 * Math.PI) / 6000) * time.getMilliseconds()
    //   );
    //   ctx.translate(0, 28.5);
    //   ctx.drawImage(moon, -3.5, -3.5);
    //   ctx.restore();

    //   ctx.restore();

    //   ctx.beginPath();
    //   ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    //   ctx.stroke();

    //   ctx.drawImage(sun, 0, 0, 300, 300);

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
