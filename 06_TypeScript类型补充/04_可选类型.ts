function printPoint(point: { x: number; y: number; z?: number }) {
  console.log(point.x, point.y, point.z)
}

printPoint({ x: 10, y: 20 })
printPoint({ x: 10, y: 20, z: 30 })
