# 03_Webpack_ts

## Part 1

搭建webpack环境下的ts编写环境。

```
  npm init
  npm install webpack webpack-cli -D
```

此时直接执行 webpack 会报错，原因是webpack并不认识.ts文件，我们需要安装ts-loader

```
  npm install ts-loader -D
```

并在webpack.config.js中配置module中的rules，将匹配到的.ts文件使用ts-loader进行处理。

这时执行webpack，会报错：原因是使用ts-loader时，需要配置tsconfig.json文件（后续讲解），这里临时使用

```
  tsc --init
```

帮助我们生成一个tsconfig.json

此时，执行webpack仍然会报错，原因是：

> Module not found: Error: Can't resolve './math' in '.\Learn-TypeScript\03_Webpack_ts\src'

我们需要在webpack.config.js中写入resolve > extensions > '.ts'

原理是，当webpack匹配到import语句导入的模块后，如果提供了后缀名，则直接打包文件，如果未提供后缀名，则使用resolve.extensions选项作为文件扩展名解析。

此例中 import './math' 未提供后缀名，则需要在resolve.extensions中写好'.ts'，这样在解析到文件时可以自动添加后缀名并解析。（课件08 Page33）

## Part 2

此时我们已经有了ts-loader为我们实现了编译、打包操作，但是每次代码更新我们不得不手动使用 npm run build 执行webpack命令重新打包，很麻烦。

利用 webpack-dev-server 搭建本地服务

```
  npm install webpack-dev-server -D
```