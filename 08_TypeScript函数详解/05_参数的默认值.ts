function foo(x: number, y: number = 10, z?: number) {
  return !!z ? x + y + z : x + y
}

console.log(foo(20, undefined))
console.log(foo(20, undefined, 30))
