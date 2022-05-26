class Person {
  readonly name: string
  age: number
  readonly friend?: Person
  constructor(name: string, age: number, friend?: Person) {
    this.name = name
    this.age = age
    this.friend = friend
  }
}
const p = new Person("Ziu", 18, new Person("Chen", 19))
// p.name = "ZIU" // 报错
if (p.friend) {
  p.friend.age = 23
}
console.log(p)
