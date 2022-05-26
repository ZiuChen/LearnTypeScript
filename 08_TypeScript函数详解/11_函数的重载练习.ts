/* 联合类型实现 */
function getLengthUnion(args: string | any[]) {
  return args.length
}
console.log(getLengthUnion("abc")) // > 3
console.log(getLengthUnion([123, 456, 798])) // > 3

/* 函数重载实现 */
function getLength(arg: string): number
function getLength(arg: any[]): number
function getLength(arg: any): any {
  return arg.length
}
console.log(getLength("abc")) // > 3
console.log(getLength([123, 456, 798])) // > 3
