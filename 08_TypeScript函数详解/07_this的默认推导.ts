// this是可以被推导出来 info对象(TypeScript推导出来)
const info = {
  name: "Ziu",
  eating() {
    console.log(this.name + " eating")
  }
}

info.eating()

export {}
