class Person {
  private _name: string
  constructor(name: string) {
    this._name = name
  }
  set name(newName: string) {
    this._name = newName
  }
  get name() {
    return this._name
  }
}

const p = new Person("Ziu")
p.name = "ZiuChen" // 调用了 setter
console.log(p.name) // 调用了 getter
