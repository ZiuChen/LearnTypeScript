class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  eating() {
    console.log(this.name + " is eating.")
  }
}

class Student extends Person {
  stuID: string
  constructor(name: string, age: number, stuID: string) {
    super(name, age) // 必须写在第一行
    this.stuID = stuID
  }
  eating() {
    console.log("My id is: " + this.stuID)
    super.eating()
  }
  studying() {
    console.log(this.name + " is studying.")
  }
}

const student = new Student("Ziu", 18, "0101")
student.eating()
