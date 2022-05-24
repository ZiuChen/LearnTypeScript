# 06_TypeScript类型补充

## 01_函数的参数和返回值类型

* 给入参加入类型注解 **（包括入参的类型、入参的个数）**
* 给返回值加入类型注解（默认无返回值为void）

```ts
  function sum(num1: number, num2: number): number {
    return num1 + num2
  }
```

在开发中可以忽略为返回值指定类型，按照类型推导自动推导其类型。

## 02_匿名函数的参数类型

通常情况下，在定义一个函数时我们都需要给参数加上类型注解

但是针对匿名函数，比如传入 `forEach` 的回调函数，可以不添加类型注解，也即：**在上下文中的函数，可以根据类型推导，推导出参数的类型，不需要添加类型注解**

这个过程称为： `上下文类型(contextual typing)`

## 03_对象类型

当我们为函数入参传递一个对象，可以用对象类型：

```ts
  function printPoint(point: { x: number; y: number }) {
    console.log(point.x, point.y)
  }

  printPoint({ x: 10, y: 20 })
```

* 需要注意的是，属性之间可以用 `;` 分隔，也可以用 `,` 分隔。
* 如果不指定属性的类型，则为默认的any

## 04_可选类型

在指定类型的 `:` 前添加一个 `?`，可以使此参数为可选参数：

```ts
  function printPoint(point: { x: number; y: number; z?: number }) {
    console.log(point.x, point.y, point.z)
  }

  printPoint({ x: 10, y: 20 }) // > 10 20 undefined
  printPoint({ x: 10, y: 20, z: 30 }) // > 10 20 30
```

未传入参数时，在函数内调用此参数，其值为undefined

## 05_联合类型

ts允许我们使用多种运算符，从现有类型中构建新的类型：联合类型（union type）

```ts
  function printID(id: string | number) {
    switch (typeof id) {
      case "string":
        console.log(id.toLocaleUpperCase())
        break
      case "number":
        console.log(id)
        break
      default:
        const check: never = id
        break
    }
  }
  printID(123)
  printID("456")
```

使用联合类型的值时，需要特别小心，要针对不同情况提供不同的处理方法，否则会导致报错。

对入参的类型范围进行判断的过程，称为"narrow"，也即：缩小，缩小了入参的处理范围。

## 06_可选类型和联合类型的关系

当我们要传入一个可选的参数时，可选类型与联合类型（与undefined联合）是等价的：

```ts
  function foo(message: string | undefined) {
    console.log(message)
  }
  function bar(message?: string) {
    console.log(message)
  }
  foo(undefined)
  bar()
```

可选参数实质上是任意类型与undefined类型的联合类型。

此时，`foo()` 与 `bar()` 是等价的。

## 07_类型别名

如果同一类型的变量在不同地方使用了多次，需要考虑类型的复用，可以使用类型别名来实现。

用 `type` 关键词来定义类型别名，可以简化代码，提高可复用性。

```ts
  type IDType = string | number | boolean
  function printID(id: IDType) {
    console.log(id)
  }
```

```ts
  type PointType = {
    x: number
    y: number
    z?: number
  }
  function printPoint(point: PointType) {
    console.log(point)
  }
```

`interface` 也可以实现类似的功能，与type的区别在后续内容中介绍。