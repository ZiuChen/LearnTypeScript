// const info = {
//   title: "程序员",
//   title: "老师"
// }

const title1 = Symbol("title")
const title2 = Symbol("title")
const info = {
  [title1]: "程序员",
  [title2]: "老师"
}

console.log(info) // { [Symbol(title)]: '程序员', [Symbol(title)]: '老师' }
