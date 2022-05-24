type Person = {
  name: string
  friend?: {
    name: string
    age?: number
  }
}

const info: Person = {
  name: "Ziu",
  friend: {
    name: "why"
  }
}

console.log(info.name) // > Ziu
console.log(info?.friend?.name) // > why
console.log(info?.friend?.age) // > undefined
