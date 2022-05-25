/* Example_1 */
type infoType = {
  name: string
}
function sayHello(this: infoType) {
  console.log(this.name + ", Hello!")
}
const info = {
  name: "Ziu",
  sayHello
}
info.sayHello()

/* Example_2 */
function eating(this: infoType, message: string) {
  console.log(this.name + " eating", message)
}
const info2 = {
  name: "Ziu",
  eating: eating
}
// 隐式绑定
info2.eating("哈哈哈")

// 显式绑定
eating.call({ name: "kobe" }, "呵呵呵")
eating.apply({ name: "james" }, ["嘿嘿嘿"])
