# 08_TypeScript函数详解

## 01_函数的类型

* 可以在定义函数时为入参、返回值指定类型
* 也用 `type` 关键字预先定义好类型，并在定义函数时指定

```ts
  function foo(num1: number, num2: number) {
    return num1 + num2
  }
  function bar(fn: (num1: number, num2: number) => number) {
    fn(10, 20)
  }

  type fooType = (num1: number, num2: number) => number
  const newFoo: fooType = (num1, num2) => {
    return 5
  }
```

需要注意的是，当我们定义一个函数参数类型时，参数类型中，参数名是必须的(required)，比如fooType入参中的 `num1` 与 `num2`。

## 02_函数类型的案例

如果函数作为参数传入另一个函数，入参的函数为匿名函数，其类型可以由ts的类型推导确定，如forEach()中的回调函数、下例中传入calc的fn：

```ts
  function calc(n1: number, n2: number, fn: (num1: number, num2: number) => number) {
    return fn(n1, n2)
  }

  const result1 = calc(10, 20, (a1, a2) => {
    return a1 + a2
  })
  const result2 = calc(10, 20, (a1, a2) => {
    return a1 * a2
  })
  console.log(result1, result2)
```

## 03_函数的可选类型

前文已述

## 04_参数的可选类型

前文已述

## 05_参数的默认值

传入函数的参数顺序：必传参数 > 有默认值的参数 > 可选参数

```ts
  function foo(x: number, y: number = 10, z?: number) {
    return !!z ? x + y + z : x + y
  }

  console.log(foo(20, undefined))
  console.log(foo(20, undefined, 30))
```

## 06_函数的剩余参数

某一些函数，可以传任意个数的参数，传入的参数会放进一个参数数组里。

```ts
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
```