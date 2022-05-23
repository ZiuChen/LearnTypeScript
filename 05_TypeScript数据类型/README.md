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

这样的机制，可以防止拿到unknown类型的变量时赋值给其他变量，而只能赋值给unknown类型的变量。
