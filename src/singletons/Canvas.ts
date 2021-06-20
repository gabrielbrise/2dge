import Keyboard from './Keyboard'

export interface ICanvas {
  height: number
  width: number
  id: string
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keyboard: any
  timestamp: DOMHighResTimeStamp
  objects: any[]
  inject: Function
  add: Function
  remove: Function
}

interface Canvas extends ICanvas {}

class Canvas {
  private static instance: Canvas
  private constructor(
    width: number = 640,
    height: number = 480,
    objects: any[] = []
  ) {
    this.height = height
    this.width = width
    this.id = '2dge-canvas'
    this.inject()
    this.element = document.getElementById(this.id) as HTMLCanvasElement
    this.ctx = this.element.getContext('2d')
    this.keyboard = new Keyboard()
    this.timestamp = 0
    this.objects = objects
  }

  public static start() {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas()
    } else {
      console.warn(
        'Canvas already initialized. Only one canvas can exist at a time since this is a singleton'
      )
    }
  }

  public static get() {
    if (Canvas.instance) return Canvas.instance
    console.warn(
      'Canvas not yet initialized. Initialize the canvas with start() before trying to get its instance'
    )
  }

  draw(timestamp: DOMHighResTimeStamp) {
    this.timestamp = timestamp
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.save()
    this.ctx.restore()

    this.objects.forEach((object) => {
      object.update()
    })

    window.requestAnimationFrame((timestamp) => this.draw(timestamp))
  }

  inject() {
    let c = document.createElement('canvas')
    c.width = this.width
    c.height = this.height
    c.id = this.id
    document.body.appendChild(c)
  }

  add(newObject: any) {
    this.objects.push(newObject)
  }

  remove(id: string) {
    this.objects = this.objects.filter((obj) => obj.id !== id)
  }
}

export default Canvas
