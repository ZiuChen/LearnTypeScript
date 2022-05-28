// type CalcFn = (n1: number, n2: number) => number
interface CalcFn {
  (n1: number, n2: number): number
}

function executeFn(num1: number, num2: number, Fn: CalcFn) {
  return Fn(num1, num2)
}
const add: CalcFn = (n1, n2) => {
  return n1 + n2
}

executeFn(10, 20, add)

export {}
