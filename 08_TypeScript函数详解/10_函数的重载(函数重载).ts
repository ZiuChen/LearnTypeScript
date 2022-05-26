function add(num1: number, num2: number): number
function add(num1: string, num2: string): string
function add(num1: any, num2: any): any {
  return num1 + num2
}

console.log(add(20, 30)) // > 50
console.log(add("haha", "hehe")) // > hahahehe
// console.log(add(10, "hehe")) // 报错
// console.log(add({ name: "ziu" }, { age: 99 })) // 报错
