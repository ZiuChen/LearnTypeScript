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

## 07_this的默认推导

在js中，this始终指向最后调用它的对象。而在ts中，this的类型也是可以被推导出来的：

```ts
  const info = {
    name: "Ziu",
    eating() {
      console.log(this.name + " eating")
    }
  }
  info.eating()
```

在此例中，this被推导为info对象，也就是调用this.name，实际上也就是调用info.name。

## 08_this的不明确类型

### 指定this的类型

在某些情况下，ts会由于this的指向不明确，代码存在隐患而报错：

```ts
  function sayHello() {
    console.log(this.name + ", Hello!")
  }
  const info = {
    name: "Ziu",
    sayHello
  }
  info.sayHello()
```

> 'this' implicitly has type 'any' because it does not have a type annotation.

由于是从info中调用sayHello，虽然我们知道此时this指向的是info对象，但是其他人在使用sayHello函数时，可能直接调用、也可能在其他对象内调用，这就为执行带来了不确定性，ts认为代码不安全，编译不通过。

这时我们需要手动指定this的类型：

```ts
  type infoType = {
    name: string
  }
  function sayHello(this: infoType) {
    console.log(this.name + ", Hello!")
  }
  const info = {
    name: "Ziu",
    sayHello
  }
  info.sayHello()
```

### 隐式绑定与显式绑定

在对象中调用函数时，函数中的 `this` 会被绑定到该对象上，这样的绑定称为 **隐式绑定**。

而当我们希望在对象外面调用函数时也能让函数中的 `this` 指向到某一对象上时，就需要通过 `call` 与 `apply` 实现显式绑定。（人为改变this的指向）

```ts
  function eating(this: infoType, message: string) {
    console.log(this.name + " eating", message)
  }
  const info2 = {
    name: "Ziu",
    eating: eating
  }
  // 隐式绑定
  info2.eating("哈哈哈") // > Ziu eating 哈哈哈
  // 显式绑定
  eating.call({ name: "kobe" }, "呵呵呵") // > kobe eating 呵呵呵
  eating.apply({ name: "james" }, ["嘿嘿嘿"]) // > james eating 嘿嘿嘿
```

**call与apply的区别：**

* `call()` 第二个参数接受的是**若干个参数列表**
* `apply()` 第二个参数接收**一个包含多个参数的数组**

相关链接：[CoderWhy - 前端面试之彻底搞懂this指向](https://mp.weixin.qq.com/s/hYm0JgBI25grNG_2sCRlTA) [掘金 - this、apply、call、bind](https://juejin.cn/post/6844903496253177863)

## 09_函数的重载(联合类型)

设想我们需要用ts实现一个函数，可以将传入的两个参数合并并返回，参数可能是数字也可能是字符串。

```ts
  function add(num1: number | string, num2: number | string) {
    return num1 + num2
  }
```

上述函数在 return 部分会报错，原因是 `运算符“+”不能应用于类型“string | number”和“string | number”。`

实际上，string与number是可以直接相加的，但是num1与num2并不是 `string` **或** `number` 类型，而都是 `string | number` 类型，这种类型未定义 `+` 的操作，是不可以用 `+` 的。

要使用加法，可以用联合类型解决此问题：

```ts
  function add(num1: number | string, num2: number | string) {
    if (typeof num1 === "number" && typeof num2 === "number") {
      return num1 + num2
    } else if (typeof num1 === "string" && typeof num2 === "string") {
      return num1 + num2
    } else if (typeof num1 === "number" && typeof num2 === "string") {
      return num1 + num2
    } else if (typeof num1 === "string" && typeof num2 === "number") {
      return num1 + num2
    }
  }
```

显而易见，这样的方法实现十分臃肿，并且存在两个弊端：

* 需要进行很多逻辑判断（类型缩小）
* 返回值的类型是不确定的：`string | number`

## 10_函数的重载(函数重载)

函数重载的概念在很多编程语言中都存在，它代表的是：函数名称相同，但是参数不同的几个函数，就是函数重载。

```ts
function add(num1: number, num2: number): number
function add(num1: string, num2: string): string
function add(num1: any, num2: any): any {
  return num1 + num2
}
console.log(add(20, 30)) // > 50
console.log(add("haha", "hehe")) // > hahahehe
console.log(add(10, "hehe")) // 报错
console.log(add({ name: "ziu" }, { age: 99 })) // 报错
```

> 报错：没有与此调用匹配的重载。针对此实现的调用已成功，但重载的实现签名在外部不可见。

将函数类型的声明，与函数的实现分开了：对于函数类型的限制使用的是上面函数的声明，对于具体函数的执行，使用的是下面函数的实现。

## 11_函数的重载练习

在实际开发中，选择更简单的方法实现。

```ts
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
```