import Canvas, { ICanvas } from './singletons/Canvas'
import Sprite from './Sprite'
import { getRowColumnCount, getRowColumnPosition } from './utils/tiles'

interface TilesProps {
  size: number
  animationTime: number
  tileSheet: {
    src: string
    frames?: { x: number; y: number; width: number; height: number }[]
  }
  grid: number[][]
}

interface Tiles extends TilesProps {
  canvas: ICanvas
  image: HTMLImageElement
  canvasGrid: { rows: number; columns: number }
  canvasMatrice: number[][]
  tileSheetGrid: { rows: number; columns: number }
  sprites: Sprite[]
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
    this.canvasGrid = getRowColumnCount(
      this.canvas.width,
      this.canvas.height,
      size
    )
    this.tileSheetGrid = getRowColumnCount(
      this.image.width,
      this.image.height,
      size
    )
    this.sprites = this.createTileSprites()
  }

  update = () => {
    this.draw()
  }

  createTileSprites = () => {
    let sprites
    this.canvasMatrice.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell) {
          const spritePosition = getRowColumnPosition(
            rowIndex + 1,
            columnIndex + 1,
            this.size
          )
          sprites.push(
            new Sprite({
              width: this.size,
              height: this.size,
              src: this.tileSheet.src,
              animationTime: this.animationTime,
              position: spritePosition,
              frames: this.tileSheet.frames,
            })
          )
        }
      })
    })
    return sprites
  }

  draw = () => {
    this.sprites.forEach((sprite, index) => {
      sprite.animate()
      sprite.draw()
    })
  }
}

export default Tiles
