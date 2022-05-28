function mkArea(shape: Shape) {
  return shape.getArea()
}

abstract class Shape {
  abstract getArea(): number
}

class Rectangle extends Shape {
  private width: number
  private height: number
  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
  }
  getArea() {
    return (this.width * this.height) / 2
  }
}

class Round extends Shape {
  private radius: number
  constructor(radius: number) {
    super()
    this.radius = radius
  }
  getArea() {
    return Math.pow(this.radius, 2) * Math.PI
  }
}

const rec = new Rectangle(10, 20)
const rnd = new Round(10)
console.log(mkArea(rec)) // > 100
console.log(mkArea(rnd)) // > 314.1592653589793
