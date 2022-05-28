// 允许定义两个相同名称的接口
// 两个接口会合并
interface IFoo {
  name: string
}
interface IFoo {
  act: (num: number) => void
}
const f: IFoo = {
  name: "Ziu",
  act: (num) => {
    console.log(num)
  }
}

interface Window {
  age: number
}
window.age = 99
console.log(window.age)
