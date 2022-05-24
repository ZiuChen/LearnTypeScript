function foo(message: string | undefined) {
  console.log(message)
}

function bar(message?: string) {
  console.log(message)
}

foo(undefined)
bar()
