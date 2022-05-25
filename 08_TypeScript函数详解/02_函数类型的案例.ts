function calc(n1: number, n2: number, fn: (num1: number, num2: number) => number) {
  return fn(n1, n2)
}

const result1 = calc(10, 20, (a1, a2) => {
  return a1 + a2
})
const result2 = calc(10, 20, (a1, a2) => {
  return a1 * a2
})
console.log(result1, result2)
