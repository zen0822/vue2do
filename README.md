# vue2do - 基于 vue2 的响应式基础组件
[![Coverage Status](https://coveralls.io/repos/github/zen0822/vue2do/badge.svg)](https://coveralls.io/github/zen0822/vue2do)
[![Build Status](https://travis-ci.org/zen0822/vue2do.svg?branch=master)](https://travis-ci.org/zen0822/vue2do)
[![Build Status](https://saucelabs.com/buildstatus/zen_n)](https://saucelabs.com/beta/builds/e8ac8e3b1d664ce5997afc6879f2858b)

[![vue2do](https://nodei.co/npm/vue2do.png)](https://npmjs.org/package/vue2do)

[![Build Status](https://saucelabs.com/browser-matrix/zen_n.svg)](https://saucelabs.com/beta/builds/e8ac8e3b1d664ce5997afc6879f2858b)


## 安装
```sh
npm install vue2do -S
```

## 开始使用

### 全部加载
``` js
import Vue from 'vue'
import vue2do from 'vue2do'

Vue.use(vue2do)
```
在项目中使用
``` html
<z-input></z-input>
```

### 局部加载
```js
import {
  select,
  input
  // ...
} from 'vue2do'

Vue.component('select', select)
Vue.component('yourPrefix' + input.compName, input)
```

### 只打包指定的单个文件

#### 因为从 vue2do/index.js 文件加载的时候会加载所有的组件，所以如果只要加载其中制定的组件只需要加载 vue2do/src/component/[componentName]/[componentName]

***

获取更多信息请访问 vue2do 的 [文档网站](https://zen0822.github.io)。

本项目遵循 [semver](http://semver.org/lang/zh-CN/) 版本管理