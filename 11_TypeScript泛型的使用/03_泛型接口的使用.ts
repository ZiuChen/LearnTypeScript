interface IPerson<T1, T2> {
  name: T1
  age: T2
}

const p1: IPerson<string, number> = {
  name: "Ziu",
  age: 18
}

const p2: IPerson<number, boolean> = {
  name: 33,
  age: true
}
