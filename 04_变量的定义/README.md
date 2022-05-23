# 04_变量的定义

## 01_变量的定义格式

ts中定义变量的标准格式：

```
  var/let/const 标识符: 数据类型 = 赋值;
```

### 补充: string与String

小写的 `number` 与 `Number` 是不同的

* string 表示的是Typescript中的字符串类型，
* String 表示的是Javascript中字符串的包装类的类型。
* String / Number / Boolean 同理

### 补充: tslint

* eslint => js代码规范约束
* tslint => ts代码规范约束

在终端执行下述命令：

```
  tslint init
```

会生成tslint.json文件，在文件中可以配置ts文件的书写规范，当我们书写了不符合规范的代码时编辑器会报错。（例如单引号/双引号等）

在学习初期先学习语法，形成体系后再上tslint形成规范。

### 补充: 类型推导

定义常量时，ts可以直接通过类型推导，根据你赋的值，推导出变量的类型。

```
  let foo: string = "Haha"
  let foo = "Haha"
```

两行代码是等价的，并且是正确的。

个人习惯：默认情况下，如果可以推导出对应标识符类型，一般情况下是不添加的。如果不同项目有具体的规范，则按照规范来。

## 02_number类型的使用

typescript与javascript一样，不区分int整型与float浮点型，统一为number

* 二进制 `0b`
* 八进制 `0o`
* 十六进制 `0x`

## 03_boolean类型的使用

## 04_string类型的使用

## 05_array类型的使用

当我们给一个变量赋值为空数组时，变量的数组类型是确定的，但是数组中存放的元素类型需要额外确定。

如果我们不指定存放元素的类型，默认是 `any` 类型，也即：任何元素都可以被添加到数组中，存在风险。

**数组中存放的元素类型最好是固定的**

两种方式指定数组中的元素类型，更推荐type2，原因是此语法在jsx中有冲突（解析jsx时，与HTML的标签`<>`冲突）。

```ts
  let names1: Array<string> = [] // 不推荐
  let names2: string[] = []
```

## 05_object类型的使用

在实际开发时，尽量不要指定 object类型，例如：

```ts
  const info: object = {
    name: "Ziu",
    age: 18
  }
  console.log(info.name) // 报错
```

当我们从info中取name时会报错：`object上不存在属性name`

原因是，在tsc编译时认为info是object类型，但对于普通的object类型中是不存在name属性的。可以让ts自行推导类型。

（后续：可以通过 as 类型断言解决此问题）

## 07_null和undefined类型

null类型只有一个值：`null`，如果确实只有一个null值，尽量通过 `:null` 指定，避免用类型推导，否则会被自动推导为any。

自动推导为any的原因：初始化时给变量赋值为null，后续再给变量赋为其他值，但不推荐这种做法

可以在tsconfig.json中配置严格模式，也可以避免这种问题。

## 08_symbol类型

（ES6新增 了解即可）

不能在同一对象中使用两个相同的key，即使定义了两个相同的key，即使强行执行代码，后一个key也会将前一个key覆盖掉。

```ts
  const title1 = Symbol("title")
  const title2 = Symbol("title")
  const info = {
    [title1]: "程序员",
    [title2]: "老师"
  }
  console.log(info) // { [Symbol(title)]: '程序员', [Symbol(title)]: '老师' }
```