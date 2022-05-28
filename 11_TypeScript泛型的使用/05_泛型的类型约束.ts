interface ILength {
  length: number
}

function getLength<T extends ILength>(arg: T) {
  return arg.length
}

// getLength(123) // 报错
getLength("Ziu")
getLength([1, 2, 3])
getLength({ length: 99 })
