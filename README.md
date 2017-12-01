# vue2do - 基于 vue2 的响应式基础组件
[![Coverage Status](https://coveralls.io/repos/github/zen0822/vue2do/badge.svg)](https://coveralls.io/github/zen0822/vue2do)
[![Build Status](https://travis-ci.org/zen0822/vue2do.svg?branch=master)](https://travis-ci.org/zen0822/vue2do)

[![vue2do](https://nodei.co/npm/vue2do.png)](https://npmjs.org/package/vue2do)


## 安装
```sh
npm i vue2do -S
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

### 加载指定组件

#### 因为从 vue2do/index.js 文件加载的时候会加载所有的组件，所以只加载指定组件就可以只打包这个组件的文件
```js
  import Input 'vue2do/component/Input'

  Vue.component('Input', Input)
```

***

获取更多信息请访问 vue2do 的 [文档网站](https://zen0822.github.io)。

本项目遵循 [semver](http://semver.org/lang/zh-CN/) 版本管理