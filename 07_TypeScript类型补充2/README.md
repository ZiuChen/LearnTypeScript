# 07_TypeScript类型补充2

## 01_类型断言as

在某些情况下，我们比ts更清楚一个数据的类型，此时我们就可以通过类型断言来告诉ts：*相信我，我知道自己在干什么。*

通过类型断言，可以实现类型范围缩小，也可以间接实现类型范围扩大：

### 缩小类型范围

```ts
  // /* html */ <img id="Ziu"/>
  // const el = document.getElementById("#Ziu")
  const el = document.getElementById("#Ziu") as HTMLImageElement
  el.src = "https://example.com"
```

典型例子，直接通过 `document.getElementById()` 获取到的el类型为 `HTMLElement`，它身上并不包含 `src` 属性，此时可以通过类型断言 `as` 指定 el 的类型为 `HTMLImageElement`，这样就可以正确从 el 上拿到 `src` 属性了。

```ts
  class Person {}
  class Student extends Person {
    study() {
      console.log("I'm Studying.")
    }
  }
  function sayHello(p: Person) {
    // p.study() // 报错
    ;(p as Student).study()
  }
  const stu = new Student()
  sayHello(stu)
```

在上例中，直接调用 `p.study()` 会报错，原因是虽然我们知道传入 `sayHello()` 的是Student类，但是ts根据我们指定的入参判断传入的是Person类，故我们需要用as断言缩小范围，指定入参p为Student类并调用其study方法。

### 间接扩大类型范围（不常见, 不常用）

```ts
  const message = "Hello, World."
  // const num: number = message // 报错
  // const num: number = message as number // 报错
  const num: number = message as any as number // 正确
```

message本身为string类型，我们要把message赋值给一个number类型的变量，可以用as先将其转为any，再将其转为number。

**如果不是特殊情况，尽量避免用此方法**

## 02_非空类型断言

可以使用 `!`，保证变量为非空。

例如，当我们在执行以下代码时，ts-node 执行会报错：

```ts
  function getMessageLength(message?: string) {
    return console.log(message.length) // ts编译执行报错
  }
  getMessageLength("Hello, World.")
```

> `tsc 02_非空类型断言.ts` 不会报错，原因是编译过程未指定 `tsconfig.json`，未启用严格模式下不会报错，而一旦 `tsc --init` 生成了ts配置文件，执行编译也会报错。

原因是message可能为undefined，取length属性存在问题。

但是如果我们能够保证，使用此函数时一定会传参，那么此处的报错就显得多余了，可以用 `message!.length` 为message添加非空类型断言，这样函数就不会报错了：

```ts
  function getMessageLength(message?: string) {
    return console.log(message!.length)
  }
  getMessageLength("Hello, World.")
```

## 03_可选链的使用

> 可选链不是TS独有的，是ES11的特性

上述代码中的 `!.` 也可以改为 `?.`。可选链使用**可选链操作符**：`?.` 

当对象的属性不存在时，会直接“短路”，返回undefined，只有存在时，代码才会继续执行。

小案例：

```ts
  type Person = {
    name: string
    friend?: {
      name: string
      age?: number
    }
  }
  const info: Person = {
    name: "Ziu",
    friend: {
      name: "why"
    }
  }
  console.log(info.name) // > Ziu
  console.log(info?.friend?.name) // > why
  console.log(info?.friend?.age) // > undefined
```

## 04_!!运算符

利用javascript的特性，当我们对一个非boolean类型的变量取反（即：在前面加 `!`），可以将其转为boolean类型。此时再在前面取反，则代表了：将变量转为boolean类型。

```ts
  const message1 = "Hello, World."
  const message2 = ""
  console.log(!!message1) // > true
  console.log(!!message2) // > true
```

## 05_??运算符

> 是ES11新增的特性，不属于ts的语法

空值合并操作符 (??) 是一个逻辑操作符，当操作符的左侧是null 或 undefined 时，返回其右侧操作数，否则返回左侧操作数。

```ts
  const message = ""
  let content = ""

  content = message ?? "Default message."
  content = message ? message : "Default message."
  console.log(content)
```

这两条为content赋值的命令是等价的，但是使用 `??` 运算符的命令更加简短。

## 06_字面量类型

数据本身也是可以作为类型的。这种类型称为字面量类型，字面量类型必须始终与其值保持一致。

```ts
  // const message = "Hello, World."
  // const message:string = "Hello, World."
  const message: "Hello, World." = "Hello, World."
  const num: 123 = 123
```

我们可以将多个字面量类型联合到一起：

```ts
  type AlignType = "right" | "left" | "top" | "bottom"
  const align: AlignType = "top"
```

由于朝向 `align` 的值只有固定的几种，故可以通过字面量类型来指定。

## 07_字面量推理

在一些情况下，我们可以通过 `as const` 将其他类型比较宽泛的变量转为字面量类型，

```ts
  type Method = "GET" | "POST"
  function request(url: string, method: Method) {}
  const options = {
    url: "https://ZiuChen.org/index.html",
    method: "POST"
  }
  // request(options.url, options.method) // 报错
```

上例中，request函数的入参 method 为 Method类型，是一个字面量类型，只允许 'GET' 类与 'POST' 类传入。而options通过类型推导出的method类型为string，这就导致传入request时报错。

可以通过类型断言，在传入request时，将 options.method断言为Method类：

```ts
  request(options.url, options.method as Method)
```

可以通过**字面量推理**，即 `as const` 将options转为字面量类型：

```ts
  const options = {
    url: "https://ZiuChen.org/index.html",
    method: "POST"
  } as const
  request(options.url, options.method)
```

也可以通过额外定义一个Options类型来解决此问题：

```ts
  type Options = {
    url: string
    method: Method
  }
```

## 08_类型缩小

在不同的代码执行过程，变量的类型是在不断的缩小的。

### typeof 类型缩小

typeof搭配if语句，可以实现基本的类型缩小，在函数不同的部分处理不同类型的变量。

```ts
  type ID = number | string
  function printID(id: ID) {
    console.log(id) // ID
    if (typeof id === "string") {
      console.log(id) // string
    } else {
      console.log(id) // number
    }
  }
```

### 平等的类型缩小

`==` `===` `!=` `!==` `switch`

```ts
  type Direction = "left" | "right" | "top" | "bottom"
  function printDirection(dire: Direction) {
    if (dire == "left") {
      console.log(dire.length) // left
    } else if (dire === "top") {
      console.log(dire.length) // left
    } else {
      console.log(dire.length) // right | bottom
    }
    switch (dire) {
      case "right":
        console.log(dire.length) // right
        break

      default: // left | top | bottom
        console.log(dire.length)
        break
    }
  }
```

### instanceof

判断某一个实例，是不是某一种类型。

> MDN: instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

可以通过 `instanceof` 判断一个实例是否继承自某个原型：

```ts
  function printTime(time: string | Date) {
    if (time instanceof Date) {
      console.log(time.toDateString()) // Date
    } else {
      console.log(time) // string
    }
  }
  printTime(new Date())
```

除了用js默认的对象，我们也可以在自定义对象上使用 `instanceof`：

```ts
  class Student {
    study() {}
  }
  class Teacher {
    teach() {}
  }
  function work(person: Student | Teacher) {
    if (person instanceof Student) {
      person.study() // Student
    } else {
      person.teach()
    }
  }
```

### in

`in` 用于判断某个属性是否存在于对象中。

```ts
  class Fish {
    swimming() {}
  }
  class Dog {
    running() {}
  }
  function act(animal: Fish | Dog) {
    if ("swimming" in animal) {
      animal.swimming()
    } else {
      animal.running()
    }
  }
```