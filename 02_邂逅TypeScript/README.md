# 02_邂逅TypeScript

## 01_Hello_TypeScript

Typescript的代码需要经过编译，转化为Javascript代码，才能运行在浏览器环境中。

> "tsc": Typescript compiler
>
> "babel": plugin/preset

全局安装typescript compiler：

```
  npm install typescript -g
```

```
  tsc .\01_Hello_TypeScript.ts
```

每次都使用tsc编译一次，很麻烦，不方便调试。搭建Typescript的环境。

## 02_TypeScript的数据类型

报错原因：默认情况下，所有的ts文件都是在同一个作用域下进行编译的，两个文件中声明了相同变量时，会发生冲突。

在代码中加入 export{} 可以解决此冲突，代表此文件是一个模块，模块内有自己的作用域。

### 方案1 用Webpack搭建ts环境

理想的代码编写环境：修改ts代码后，自动将ts转js，浏览器会自动替换更新的模块

### 方案2 Node的库：ts-node

在学习语法阶段，使用方案2

```
  npm install ts-node -g
```

安装完成后，直接在终端使用

```
  ts-node 02_TypeScript的数据类型.ts
```

即可“运行”ts代码，它做了两件事：1 帮你做编译 2 帮你跑在Node上