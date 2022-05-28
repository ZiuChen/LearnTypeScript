# 10_TypeScript接口的使用

## 01_声明对象类型

我们可以通过 `type` 关键字声明对象类型。

```ts
  type Person = {
    name: string
    age: number
  }
  const p: Person = {
    name: "Ziu",
    age: 18
  }
```

也可以通过**接口**声明对象类型，关键字是 `interface`。

```ts
  interface InfoType {
    title: string
    time: number
  }

  const info: InfoType = {
    title: "Tittle",
    time: 20220202
  }
```

二者在写法上有不同，其他并无区别，官方文档的建议是使用 `interface`

## 02_索引类型

可以用接口定义对象的索引的类型：

```ts
  interface IndexLanguage {
    [index: number]: string
  }
  const languages: IndexLanguage = {
    0: "Javascript",
    1: "HTML",
    2: "CSS"
  }

  interface LanguageYear {
    [name: string]: number
  }
  const languagesYears: LanguageYear = {
    C: 1972,
    Java: 1995,
    JavaScript: 1996,
    TypeScript: 2014
  }
```

第一个例子中，我们用接口，保证了变量 `languages` 的索引值都为 `number` 类型，保证了 `languagesYears` 中的索引值都为字符串类型。

注意，其中的 `index` 与 `name` 均为形参，可以自由设置其名称。

## 03_函数类型

可以用接口定义函数类型。

```ts
  // type CalcFn = (n1: number, n2: number) => number
  interface CalcFn {
    (n1: number, n2: number): number
  }
  function executeFn(num1: number, num2: number, Fn: CalcFn) {
    return Fn(num1, num2)
  }
  const add: CalcFn = (n1, n2) => {
    return n1 + n2
  }
  executeFn(10, 20, add)
```

## 04_接口的继承

接口能够实现继承，子接口继承父接口的类型定义。

```ts
  interface ISwim {
    swimming: () => void
  }
  interface IFly {
    flying: () => void
  }
  interface IActions extends ISwim, IFly {}

  const actions: IActions = {
    swimming() {},
    flying() {}
  }
```


## 05_交叉类型

之前讲到，在ts中，可以用联合类型组合多种类型：

```ts
  type WhyType = number | string
  type Direction = "left" | "right" | "center"
```

用接口也可以实现组合类型，也即：交叉类型

## 06_接口的实现

接口可以实现多个继承，即：一个子接口可以继承自多个父接口

类只能 **“单继承”**，即：一个类只能有一个父类（方便管理），但是一个类可以**实现**多个接口。关键字是`implements`

```ts
  interface ISwim {
    swimming: () => void
  }
  interface IEat {
    eating: () => void
  }

  // 类实现接口
  class Animal {}

  // 继承: 只能实现单继承
  // 实现: 实现接口, 类可以实现多个接口
  class Fish extends Animal implements ISwim, IEat {
    swimming() {
      console.log("Fish Swmming")
    }

    eating() {
      console.log("Fish Eating")
    }
  }
  class Person implements ISwim {
    swimming() {
      console.log("Person Swimming")
    }
  }
```

面向接口编程：

```ts
  // 编写一些公共的API: 面向接口编程
  function swimAction(swimable: ISwim) {
    swimable.swimming()
  }

  // 1.所有实现了接口的类对应的对象, 都是可以传入
  swimAction(new Fish())
  swimAction(new Person())

  swimAction({ swimming: function () {} })
```

## 07_interface和type的区别

如果是定义**非对象类型**，通常推荐使用 `type`。（如联合类型、函数类型等）

定义**对象类型**：更推荐用 `interface`，可以重复的对某个接口定义属性和方法，而 `type` 定义的是别名，别名是不能重复的。

```ts
  // 允许定义两个相同名称的接口
  // 两个接口会合并
  interface IFoo {
    name: string
  }
  interface IFoo {
    act: (num: number) => void
  }
  const f: IFoo = {
    name: "Ziu",
    act: (num) => {
      console.log(num)
    }
  }
```

### interface 的小例子

ts为我们内置了很多类型，当我们需要实现某些需求时，需要在这些内置的类型上添加自定义属性，以Window对象为例：

```ts
  interface Window {
    age: number
  }
  window.age = 99
  console.log(window.age)
```

在浏览器环境中的window对象上添加了age属性并赋值。

**上述的两个小案例中使用的interface特性，都是type所不具有的**

## 08_字面量赋值

虽然 IPerson 中没有定义address属性，但是ts是允许赋值的，原理是 当执行info为p赋值时，ts会做一次freshness擦除操作，如果已定义的类型满足，那么剩余的其他未定义其类型的属性也可以赋值过去。

```ts
  interface IPerson {
    name: string
    age: number
  }
  const info = {
    name: "Ziu",
    age: 18,
    address: "北京"
  }
  const p: IPerson = info
  console.log(info)
  console.log(p)
```

但是，如果info中的属性不满足IPerson中定义的属性类型，ts仍然会报错：

```ts
  interface IPerson {
    name: string
    age: number
  }
  const info = {
    name: "Ziu",
    age: "19",
    address: "北京"
  }
  const p: IPerson = info // 报错: 不能将类型“string”分配给类型“number”
```

## 09_枚举类型的使用

枚举类型是为数不多的 Ts 特有的特性之一：

* 枚举就是将一组可能出现的值，一个个列举出来，定义在一个类型中。
* 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型。

枚举的关键字是：`enum`，按照习惯，枚举中定义的类型都为**大写**。

联合类型实现Direction类型：

```ts
  type Direction = "top" | "bottom" | "right" | "left"
```

枚举实现：

```ts
  enum Direction {
    TOP,
    BOTTOM,
    RIGHT,
    LEFT
  }
  function turn(d: Direction) {
    console.log(d)
    switch (d) {
      case Direction.LEFT:
        console.log("left")
        break
      case Direction.RIGHT:
        console.log("right")
        break
      case Direction.TOP:
        console.log("top")
        break
      case Direction.BOTTOM:
        console.log("bottom")
        break
      default:
        const check: never = d
        break
    }
  }
  turn(Direction.RIGHT) // > 2 right
  turn(Direction.LEFT) // > 3 left
```

实质上，枚举中定义的类型都对应着一个值，这些值是随第一个属性递增的，这些值可以由我们自行修改。

注意，case判断的是 `Direction.LEFT`，而非 `d`。代码末尾使用了never类型纠错。