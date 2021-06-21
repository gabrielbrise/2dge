export interface PositionProps {
  x: number
  y: number
}

export interface IPosition extends PositionProps {}

interface Position extends IPosition {}

class Position {
  constructor({ x, y }: PositionProps) {
    this.x = x
    this.y = y
  }
}

export default Position
