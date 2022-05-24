function foo(): never {
  while (true) {}
  // return // 报错: 不能将类型“undefined”分配给类型“never”。
}

function bar(): never {
  throw Error("error")
  // return // 报错: 不能将类型“undefined”分配给类型“never”。
}

function handleMessage(message: string | number) {
  switch (typeof message) {
    case "string":
      console.log("string" + "处理方法")
      break
    case "number":
      console.log("number" + "处理方法")
      break
    default:
      const check: never = message
      break
  }
}

handleMessage("Hello.")
handleMessage(33)
// handleMessage(true)
