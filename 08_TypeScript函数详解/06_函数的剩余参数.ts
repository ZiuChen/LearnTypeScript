function sumOld(num1: number, num2: number) {
  return num1 + num2
}

function sumNew(...nums: number[]) {
  let result = 0
  nums.forEach((num) => {
    result += num
  })
  return result
}

console.log(sumNew(5, 6, 7, 8))
