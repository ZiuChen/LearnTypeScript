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