let message: string = "Hello"

// message = 123 // 报错

function foo(params: string) {
  console.log(params.length)
}

// foo(123) // 报错
// foo() // 报错
foo("Hello, TypeScript.")
