/* Example_1 */
// /* html */ <img id="Ziu"/>
// const el = document.getElementById("#Ziu")
const el = document.getElementById("#Ziu") as HTMLImageElement
el.src = "https://example.com"

/* Example_2 */
class Person {}
class Student extends Person {
  study() {
    console.log("I'm Studying.")
  }
}

function sayHello(p: Person) {
  // p.study() // 报错
  ;(p as Student).study()
}

const stu = new Student()
sayHello(stu)

/* Example_3 */
const message = "Hello, World."
// const num: number = message // 报错
// const num: number = message as number // 报错
const num: number = message as any as number // 正确
