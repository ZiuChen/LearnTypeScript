class Student {
  static time: string = "20:00"
  static attendClass() {
    console.log("go to classroom.")
  }
}

console.log(Student.time) // > 20:00
Student.attendClass() // > go to classroom.
