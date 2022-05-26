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
  stuID: string = "0101"
  studying() {
    console.log(this.name + " is studying.")
  }
}

class Teacher extends Person {
  teacherID: string = "8080"
  teaching() {
    console.log(this.name + " is teaching.")
  }
}

const teacher = new Teacher("Ziu", 18)
const student = new Student("Chen", 18)
teacher.eating()
teacher.teaching()
student.studying()
