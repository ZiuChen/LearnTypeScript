class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  eating() {
    console.log(this.name + "is eating")
  }
}

const p = new Person("Ziu", 18)
console.log(p.age)
console.log(p.eating())
