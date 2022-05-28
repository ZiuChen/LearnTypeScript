# 12_TypeScript其他内容补充

> Modify from `03_Webpack_ts`.

## 模块化开发

TypeScript支持两种方式，来控制我们的作用域：

* 模块化：每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS
* 命名空间：通过namespace来声明一个命名空间

### 模块化

`./utils/math.ts`

```ts
  export function add(n1: number, n2: number) {
    return n1 + n2
  }
  export function sub(n1: number, n2: number) {
    return n1 - n2
  }
```

`main.ts`

```ts
  import { add, sub } from "./utils/math"
  console.log(add(10, 20))
  console.log(sub(10, 20))
```

### 命名空间

命名空间，早称“内部模块”，相当于在模块里面再有更小的模块。

主要目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题。

一般情况下，我们通过修改变量名来解决命名冲突的问题：

```ts
  export function format1(time: string) {
    return "2022-02-22"
  }
  export function format2(price: number) {
    return "$99.05"
  }
```

Ts提供了namespace关键字，用以解决命名冲突的问题：

`./utils/format.ts`

```ts
  export namespace time {
    const a = "Ziu"
    export function format(time: string) {
      return "2022-02-22"
    }
  }

  export namespace price {
    export function format(price: number) {
      return "$99.05"
    }
  }
  time.format("1234")
  price.format(6547)
```

`main.ts`

```ts
  import { add, sub } from "./utils/math"
  import { time, price } from "./utils/format"
  console.log(time.a)
  console.log(time.format("123456"))
  console.log(price.format(456))
```

## 类型的查找

Typescript有两种类型的文件：

* `.ts` 文件：最终会编译为.js文件，也是我们通常编写代码的文件
* `.d.ts`文件：它是用来作类型声明的文件，仅仅用来作类型检测，告知ts我们有哪些类型

Typescript会在哪里查找我们的类型声明？

* 内置类型声明：是安装ts环境时自带的，内置了一些Js运行时的标准化API声明文件。比如 `document.querySelector` 等
* 外部定义类型声明：第三方库，自带帮助我们做类型声明的文件
* 自己定义类型声明：在项目根目录自行创建`.d.ts`

### 外部定义和自定义声明

**外部定义**

一般有两种类型声明方式：
* 在库内进行类型声明，安装库时会随着下载其中的类型声明文件
* 声明文件与库未在一起，通过社区公有库存放类型声明文件

同样是导入第三方库，导入 `axios` 不会报错，而导入 `lodash` 则会报错，这是因为 `lodash` 没有定义类型声明文件。

```shell
  npm i @types/lodash --save-dev
```

安装后，可以发现编译通过了。

**自定义声明**

我们将先前安装的lodash类型模块卸载，通过自定义声明解决：

`main.ts`

```ts
  import lodash from "lodash"
  lodash.join(["asd", "qwe"])
```

`Ziu.d.ts`

```ts
  declare module "lodash" {
    export function join(arr: any[]): string
  }
```

由此可见，类型声明只影响ts的类型检测，不影响函数的具体实现。

在 `.d.ts` 中，我们可以声明变量、声明函数、声明类···那我们在何时会用到这些声明呢？

```ts
  const E = "username"
```

比如我们在网页中定义了全局变量 `E`，但是在编写ts代码中，它并不知道你时用到的E是何方神圣，这时就可以在 `.d.ts` 中声明：

```ts
  declare const E: string
```

同样的，还可以声明类、声明函数等。

声明图片文件：

```ts
  declare module "*.jpg"
  declare module "*.jpeg"
  declare module "*.png"
  declare module "*.svg"
  declare module "*.webp"
```

声明命名空间：

```ts
  declare namespace $ {
    export function ajax(setting: any): any
  }
```

```ts
  $.ajax(...)
```