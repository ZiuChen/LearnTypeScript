# 11_TypeScript泛型的使用

在调用函数时动态决定类型是什么，而不是事先指定。

## 01_认识泛型

当我们需要实现的需求，对函数入参有较为复杂的要求时，用普通的联合类型写会很臃肿：

```ts
  function sum(
    e1: number | string | any[] | { length: number },
    e2: number | string | any[] | { length: number }
  ) {
    // if() {}
    //  else if() {}
    //  else if() {}
    //  ...
  }
```

**类型参数化**可以简化逻辑：传入参数的到底是什么类型，不是我手动指定什么类型就是什么类型，而是让调用者以参数的形式告知，这里的函数参数应该是什么类型。

```ts
  function func<Type>(num1: Type): Type {
    return num1
  }
  // 明确传入类型
  func<number>(10)
  func<{ name: string }>({ name: "ziu" })
  func<any[]>([123, 456])
  // 通过类型推导
  func(20)
  func({ name: "Zhang3" })
  func([123, 456])
```

将类型提取到前面，将类型进行*参数化*，在调用函数时动态识别传入的是何种类型，而不是预先写死。

## 02_泛型接受参数类型

能同时设置多个泛型以接收多个不同类型的参数：

```ts
  function foo<T, E, O>(arg1: T, arg2: E, arg3: O) {}
  foo<number, string, boolean>(10, "123", false)
```

在实际开发时，有一些常用的泛型名称：

* `T`: **Type**
* `K` `V`: **key & value**
* `E`: **Element**
* `O`: **Object**

## 03_泛型接口的使用

可以用泛型定义接口中使用的类型，动态决定接口内定义的变量类型。

```ts
  interface IPerson<T1, T2> {
    name: T1
    age: T2
  }
  const p1: IPerson<string, number> = {
    name: "Ziu",
    age: 18
  }
  const p2: IPerson<number, boolean> = {
    name: 33,
    age: true
  }
```

## 04_泛型类的使用

```ts
  class Point<T> {
    x: T
    y: T
    z: T
    constructor(x: T, y: T, z: T) {
      this.x = x
      this.y = y
      this.z = z
    }
  }
  const p1 = new Point("1.5", "2.3", "4.6")
  const p2 = new Point(1.2, 3.1, 1.5)
```

## 05_泛型的类型约束

前述例子中，定义泛型后，能传入的参数是任意的，我们可以用类型约束，限制能传入泛型的类型。

```ts
  function getLength<T>(arg: T) {
    return arg.length
  }
```

> 我们无法保证传入的参数一定包含 `length` 属性

可以用 `extends` 关键字，将泛型继承自一种类型：这种类型中必须包含 `length` 属性。

```ts
  interface ILength {
    length: number
  }
  function getLength<T extends ILength>(arg: T) {
    return arg.length
  }
  // getLength(123) // 报错
  getLength("Ziu")
  getLength([1, 2, 3])
  getLength({ length: 99 })
```