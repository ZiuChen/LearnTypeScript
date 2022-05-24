type IDType = string | number | boolean
type PointType = {
  x: number
  y: number
  z?: number
}

function printID(id: IDType) {
  console.log(id)
}

function printPoint(point: PointType) {
  console.log(point)
}
