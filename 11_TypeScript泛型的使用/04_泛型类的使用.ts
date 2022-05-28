class Point<T> {
  x: T
  y: T
  z: T
  constructor(x: T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = z
  }
}

const p1 = new Point("1.5", "2.3", "4.6")
const p2 = new Point(1.2, 3.1, 1.5)
