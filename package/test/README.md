# Test Utils for Vue

[![npm version](https://badge.fury.io/js/%40vue2do%2Ftest.svg)](https://badge.fury.io/js/%40vue2do%2Ftest)

## Configuration

同 `karam-webpack` 的配置，详情查看 [karam 配置文档网站](http://karma-runner.github.io/4.0/config/configuration-file.html)

### 项目配置文件

以下只列些本工具定制化过的配置

- files: 需要测试的文件路径
- preprocessors: 需要预处理的文件路径
- port: 测试服务的端口
- webpack: webpack 配置文件
- webpackMiddleware: webpack-dev-middleware configuration

> 在 cli 中一定需要传 path 参数的

### ProjectConfig 参数

`require` 引入时可以只传入 `config` 参数，则必须传入 `path`。
如果也传入 `configPath` 了，会和 `config` 合并，且 `config` 的优先级更高

```js
const vue2doTest = require('@vue2do/test')

vue2doTest.dev({
  config: {
    port: 5208
  },
  configPath: path.resolve(__dirname, '../project.config.js')
})
```
