// type Direction = "top" | "bottom" | "right" | "left"

enum Direction {
  TOP,
  BOTTOM,
  RIGHT,
  LEFT
}

function turn(d: Direction) {
  console.log(d)
  switch (d) {
    case Direction.LEFT:
      console.log("left")
      break
    case Direction.RIGHT:
      console.log("right")
      break
    case Direction.TOP:
      console.log("top")
      break
    case Direction.BOTTOM:
      console.log("bottom")
      break
    default:
      const check: never = d
      break
  }
}
turn(Direction.RIGHT) // > 2 right
turn(Direction.LEFT) // > 3 left
