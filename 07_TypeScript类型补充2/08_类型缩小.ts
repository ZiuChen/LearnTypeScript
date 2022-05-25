/* Example_1 */
type ID = number | string
function printID(id: ID) {
  console.log(id) // ID
  if (typeof id === "string") {
    console.log(id) // string
  } else {
    console.log(id) // number
  }
}

/* Example_2 */
type Direction = "left" | "right" | "top" | "bottom"
function printDirection(dire: Direction) {
  if (dire == "left") {
    console.log(dire.length) // left
  } else if (dire === "top") {
    console.log(dire.length) // left
  } else {
    console.log(dire.length) // right | bottom
  }
  switch (dire) {
    case "right":
      console.log(dire.length) // right
      break

    default: // left | top | bottom
      console.log(dire.length)
      break
  }
}

/* Example_3 */
function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toDateString()) // Date
  } else {
    console.log(time) // string
  }
}
printTime(new Date())

/* Example_4 */
class Student {
  study() {}
}
class Teacher {
  teach() {}
}
function work(person: Student | Teacher) {
  if (person instanceof Student) {
    person.study() // Student
  } else {
    person.teach()
  }
}

/* Example_5 */
class Fish {
  swimming() {}
}
class Dog {
  running() {}
}
function act(animal: Fish | Dog) {
  if ("swimming" in animal) {
    animal.swimming()
  } else {
    animal.running()
  }
}
