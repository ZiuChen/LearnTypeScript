function foo() {
  return "Yes"
}

function bar() {
  return 123
}

let flag = true
let result: unknown
// let result: string | number
// let result: any

if (flag) {
  result = foo()
} else {
  result = bar()
}

/* any与unknown的区别 */
let number: number
let string: string
let any: any = "Hello."
let unknown: unknown = "Hello."
number = any // allowed
string = any // allowed
// number = unknown // 报错
// string = unknown // 报错
