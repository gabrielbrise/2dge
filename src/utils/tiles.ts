export function getRowColumnCount(width: number, height: number, size: number) {
  return { rows: height / size, columns: width / size }
}

export function getRowColumnPosition(
  row: number,
  column: number,
  size: number
) {
  if (row < 1 || column < 1) {
    throw new Error('Matrices values should start at 1 and be positive numbers')
  }
  return {
    x: (column - 1) * size,
    y: (row - 1) * size,
  }
}
