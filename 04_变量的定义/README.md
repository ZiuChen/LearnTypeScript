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

