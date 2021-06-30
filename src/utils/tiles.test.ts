import { getRowColumnCount, getRowColumnPosition } from './tiles'

describe('getRowColumnCount', () => {
  test('should return row and column counts based on size in pixels', () => {
    const canvas = { width: 640, height: 480 }
    const tileSize = 32
    const result = getRowColumnCount(canvas.width, canvas.height, tileSize)
    const expected = { rows: 15, columns: 20 }
    expect(result).toEqual(expected)
  })
})

describe('getRowColumnPosition', () => {
  test('should return x and y positions of the specified matrix cell', () => {
    const tileSize = 32
    const result = getRowColumnPosition(2, 4, tileSize)
    const expected = { x: 96, y: 32 }
    expect(result).toEqual(expected)
  })
})
