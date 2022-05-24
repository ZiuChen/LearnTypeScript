# 05_TypeScript数据类型

## 01_any类型的使用

当变量的内容无法被确定时，可以使用any类型，any类型可以被赋值为任意类型的数据。

当我们不希望给变量添加具体类型时，比如需要处理的情况过于繁琐，也可以用any，此时的效果与原生js是相同的。

（后续深入）开发中：当进行类型断言时，一些类型断言无法进行直接转换（通过as），此时可以先将变量转为any类型，再转为其他类型。

## 02_unknown类型的使用

用于描述类型不确定的变量。

与any的区别：unknown类型的变量，只能赋值给any和unknown类型的变量，但是any类型的变量可以赋值给任何类型。

```ts
  let number: number
  let string: string
  let any: any = "Hello."
  let unknown: unknown = "Hello."
  number = any // allowed
  string = any // allowed
  number = unknown // 报错
  string = unknown // 报错
```

这样的机制，可以防止其他人拿到unknown类型的变量后赋值给其他变量，而只能赋值给unknown类型的变量。

## 03_void类型的使用

void通常用来指定一个函数是没有返回值的函数。

当我们定义一个函数，当我们未在函数内返回值时，默认由类型推断推断出函数的返回值类型就是void。

```ts
  // function sum(num1: number, num2: number): void
  function sum(num1: number, num2: number) {
    console.log(num1 + num2)
    // return num1 + num2
  }
```

在javascript中，如果我们不给函数指定返回值，其默认返回的是undefined，当我们在ts中指定一个函数的返回值类型是void时，此时函数既可以返回undefined，也可以返回null：

```ts
  function sum(num1: number, num2: number): void {
    console.log(num1 + num2)
    return undefined
  }
```

## 04_never类型的使用

never表示永远不会发生值的类型，比如一个函数：

* 一个函数中是一个死循环，或者抛出了一个异常，那么函数不会返回值
* 此时，如果给函数的返回值类型指定为void或者其他类型都不合适，此时可以使用never类型

```ts
  function foo(): never {
    while (true) {}
    return // 报错: 不能将类型“undefined”分配给类型“never”。
  }
  function bar(): never {
    throw Error("error")
    return // 报错: 不能将类型“undefined”分配给类型“never”。
  }
```

本质上，是事先做出约束与规范，为了防止后续开发中犯错。比如我们为never赋值时，编辑器会报错。

### never的应用场景

**当我们有无法访问到的代码时，也可以用never类型来约束**，下面有一个应用场景：

```ts
  function handleMessage(message: string | number) {
    switch (typeof message) {
      case "string":
        console.log("string" + "处理方法")
        break
      case "number":
        console.log("number" + "处理方法")
        break
    }
  }
  handleMessage("Hello.")
  handleMessage(33)
```

handleMessage()函数根据传入参数类型为其分配不同的处理方法，允许传入string类型与number类型。

此时如果有其他开发人员希望调用此函数，并为其传入一个 `true` 的布尔值，对方的处理方法可能是在联合类型中加入boolean：`message: string | number | boolean`

```ts
  function handleMessage(message: string | number | boolean) {
    switch (typeof message) {
      case "string":
        console.log("string" + "处理方法")
        break
      case "number":
        console.log("number" + "处理方法")
        break
    }
  }
  handleMessage("Hello.") // > string处理方法
  handleMessage(33) // > number处理方法
  handleMessage(true) // 
```

如果直接修改入参的联合类型，编辑器不会报错，运行也没有问题，但是由于缺少了针对boolean的处理函数，实质上控制台是没有报错的，这给debug带来麻烦。

此时我们可以为switch语句提供一个default的case，并在此case中为never类型的check变量赋值为message。由于在代码正确运行的情况下，default下的处理方法根本不会被函数访问到，因此这句“错误的语法”也不会报错：

```ts
  function handleMessage(message: string | number) {
    switch (typeof message) {
      case "string":
        console.log("string" + "处理方法")
        break
      case "number":
        console.log("number" + "处理方法")
        break
      default:
        const check: never = message
        break
    }
  }
```

此时，如果我们人为的为函数添加联合类型boolean，由于我们未针对boolean类型的入参提供case，default下的方法被自动访问，语法错误被发现并报出，这也就提醒了调用函数的人员：除了指定额外的入参类型，还要在函数内部提供一个处理方法。

```ts
  function handleMessage(message: string | number | boolean) {
    switch (typeof message) {
      case "string":
        console.log("string" + "处理方法")
        break
      case "number":
        console.log("number" + "处理方法")
        break
      default:
        const check: never = message // 报错
        break
    }
  }
```

## 05_tuple类型的使用

tuple是元组类型，是用来补充array的适用场景的。

在ts中，array只推荐存放相同类型的数据，但是当我们希望能用数组存放不同类型的数据，同时又不希望将数组内元素都指定为any（带来隐患），就可以用tuple。

元组中，每个元素都有自己的类型。

```ts
  let tuple: [string, number, boolean] = ["Ziu", 18, true]
  let name = tuple[0]
  let age = tuple[1]
  let flag = tuple[2]
  console.log(name.length)
```

如果用 `:any[]` 来指定数组内元素的类型，那么后续的 `name.length` 操作就会存在隐患。（从any类型的变量上调用length属性）

## 06_tuple的应用场景

useState()函数可以初始化一个state，并且通过返回一个元组，元组内有currentState与设置currentState的hook函数。

在外部可以通过解构赋值，在初始化一个变量的同时，获得一个能够修改此变量的hook函数。

useState()函数的返回值就是一个元组，可以指定元组内元素的类型，分别为变量 `any类型` 与函数 `函数类型` ，规避了any的隐患。

```ts
  function useState(state: any) {
    let currentState = state
    const changeState = (newState: any) => {
      currentState = newState
    }
    const tuple: [any, (newState: any) => void] = [currentState, changeState]
    return tuple
  }

  const [counter, setCounter] = useState(10)
  setCounter(100)

  const [title, setTitle] = useState("Hello.")
  setTitle("Hello, TypeScript.")

  const [flag, setFlag] = useState(true)
  setFlag(false)
```

### 案例场景优化

实际上，观察上述代码不难发现，还是存在any的隐患，原因是虽然我们区分了解构赋值拿到的变量与函数类型，但是实际上当我们拿到 `counter` `title` `flag` 等初始化后的变量时，他们本质上仍然是any。

> const title: any
> const setTitle: (newState: any) => void

这里可以用“泛型”来优化：

```ts
  function useState<T>(state: T) {
    let currentState = state
    const changeState = (newState: T) => {
      currentState = newState
    }
    const tuple: [T, (newState: T) => void] = [currentState, changeState]
    return tuple
  }

  const [counter, setCounter] = useState(10)
  setCounter(100)

  const [title, setTitle] = useState("Hello.")
  setTitle("Hello, TypeScript.")

  const [flag, setFlag] = useState(true)
  setFlag(false)
```

这时，代码提示能够根据入参类型，正确识别变量类型了。

> const title: string
> const setTitle: (newState: string) => void

### 补充: 函数类型

要给函数添加类型注解：

```ts
  const foo: () => void = () => {}
  type MyFunc = () => void
  const foo: MyFunc = () => {}
```

两种声明方式是等价的
