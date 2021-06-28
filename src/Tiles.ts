import Sprite from './Sprite'

interface TilesProps {
  size: number
  animationTime: number
  tileSheet: {
    range: [number, number]
    src: string
  }
}

interface Tiles extends TilesProps {}

class Tiles {
  constructor({ size, animationTime, tileSheet }: TilesProps) {
    this.size = size
    this.tileSheet = tileSheet
    this.animationTime = animationTime
  }

  update = () => {
    this.draw()
  }

  draw = () => {}
}

export default Tiles
