// 数组array的缺陷
// 从any类型的变量上调用.lengh属性，存在隐患
// let array: any[] = ["Ziu", 18, true]
// let name = array[0]
// console.log(name.length)

let tuple: [string, number, boolean] = ["Ziu", 18, true]

let name = tuple[0]
let age = tuple[1]
let flag = tuple[2]

console.log(name.length)

export {}
