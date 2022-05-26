class Person {
  public name: string
  private id: number
  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
  getID() {
    console.log("My id is: " + this.id)
    return this.name
  }
  setID(id: number) {
    console.log("New id is: " + id)
    this.id = id
    return id
  }
}

const p = new Person("Ziu", 123456)

console.log(p.name) // > Ziu
// console.log(p.id) // 报错
p.getID() // > My id is: 123456
p.setID(654321) // > New id is: 654321
