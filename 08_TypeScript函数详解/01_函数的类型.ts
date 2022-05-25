function foo(num1: number, num2: number) {
  return num1 + num2
}
function bar(fn: (num1: number, num2: number) => number) {
  fn(10, 20)
}

type fooType = (num1: number, num2: number) => number
const newFoo: fooType = (num1, num2) => {
  return 5
}
