function foo(string) {
  console.log(string.length)
}
foo("Hello, World") // 12
foo(12) // undefined
foo() // TypeError: Cannot read properties of undefined (reading 'length')

function modified_foo(string) {
  if (string) {
    console.log(string.length)
  }
}
