class Person {
  protected name: string = "Ziu"
}

class Student extends Person {
  getName() {
    return this.name
  }
}

const p = new Student()
console.log(p.getName()) // > Ziu
