function printID(id: string | number) {
  switch (typeof id) {
    case "string":
      console.log(id.toLocaleUpperCase())
      break
    case "number":
      console.log(id)
      break
    default:
      const check: never = id
      break
  }
}

printID(123)
printID("456")
