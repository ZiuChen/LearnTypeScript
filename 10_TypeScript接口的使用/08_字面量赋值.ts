interface IPerson {
  name: string
  age: number
}

const info = {
  name: "Ziu",
  age: 18,
  address: "北京"
}
const p: IPerson = info
console.log(info)
console.log(p)
