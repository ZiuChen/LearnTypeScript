class Person {
  name: string = "Ziu"
}

const p1: Person = new Person()
const p2: Person = {
  name: "ZiuChen"
}
const p3 = (p: Person) => {
  console.log(p.name)
}
