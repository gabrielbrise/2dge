import Canvas, { ICanvas } from './singletons/Canvas'

interface TilesProps {
  size: number
  animationTime: number
  tileSheet: {
    frames: number[]
    src: string
  }
  grid: boolean[]
}

interface Tiles extends TilesProps {
  canvas: ICanvas
  image: HTMLImageElement
  canvasGrid: { rows: number; columns: number }
  tileSheetGrid: { rows: number; columns: number }
}

class Tiles {
  constructor({ size, animationTime, tileSheet, grid }: TilesProps) {
    this.size = size
    this.tileSheet = tileSheet
    this.animationTime = animationTime
    this.grid = grid
    this.canvas = Canvas.get()
    this.image = new Image()
    this.image.src = tileSheet.src
    this.canvasGrid = this.getRowColumnCount(
      this.canvas.width,
      this.canvas.height,
      size
    )
    this.tileSheetGrid = this.getRowColumnCount(
      this.image.width,
      this.image.height,
      size
    )
  }

  update = () => {
    this.draw()
  }

  getRowColumnCount = (width: number, height: number, size: number) => ({
    rows: height / size,
    columns: width / size,
  })

  getRowColumnPosition = (row: number, column: number, size: number) => ({
    x: column * size,
    y: row * size,
  })

  draw = () => {
    this.grid.forEach((cell, index) => {
      cell &&
        this.canvas.ctx.drawImage(
          this.image,
          this.currentFrame.x,
          this.currentFrame.y,
          this.currentFrame.width,
          this.currentFrame.height,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        )
    })
  }

  animate() {
    if (this.tileSheet.range.length > 0) {
      const frame = Math.floor(
        ((this.canvas.timestamp + this.animationTime) /
          (this.animationTime / this.frames.length)) %
          this.frames.length
      )
      this.currentFrame = this.frames[frame]
    }
  }
}

export default Tiles
