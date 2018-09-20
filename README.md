# vue2do - 基于 vue2 的响应式基础组件

[![Coverage Status](https://coveralls.io/repos/github/zen0822/vue2do/badge.svg)](https://coveralls.io/github/zen0822/vue2do)
[![Build Status](https://travis-ci.org/zen0822/vue2do.svg?branch=master)](https://travis-ci.org/zen0822/vue2do)

[![vue2do](https://nodei.co/npm/vue2do.png)](https://npmjs.org/package/vue2do)

vue2do 的 [文档网站](https://zen0822.github.io)。

## 开始使用

### 安装

#### （真心推荐 yarn，npm 经常丢包，要不就用 cnpm）

```bash
npm i vue2do -S
```

### 全部加载

``` js
import Vue from 'vue'
import vue2do from 'vue2do'

Vue.use(vue2do)
```

#### 在项目中使用

```html
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
import Input from 'vue2do/component/Input'

Vue.component('Input', Input)
```

## 通过 script 标签加载使用

```html
...
  <body>
    <div id='app'></div>
    <script src="https://unpkg.com/babel-polyfill@^6.26.0/dist/polyfill.min.js"></script>
    <script src="https://unpkg.com/vue@^2.5.13/dist/vue.min.js"></script>
    <script src="https://unpkg.com/vuex@^3.0.1/dist/vuex.min.js"></script>
    <script src="https://unpkg.com/vue-i18n@^7.3.3/dist/vue-i18n.min.js"></script>
    <script src="https://unpkg.com/vue2do@^0.3.6/dist/vue2do.min.js"></script>
    <script>
      // 注册 vue2do 实现全局加载，就可以直接调用 z-input 之类的组件
      Vue.use(Vue2do)

      new Vue({
        data(){
          return {
            initOpt: [{
              value: 1,
              text: '1'
            }]
          }
        },
        template: '\
          <div>\
            <z-check :init-opt="initOpt"></z-check>\
            <input-box></input-box>\
          </div>',
        components: {
          'input-box': Vue2do.Input
        }
      }).$mount('#app')
    </script>
  </body>
...
```

[从 codepen 预览](https://codepen.io/zen0822/project/editor/DYympR)

## 构建单页应用（spa）和多页应用（mpa）

### 全局安装 vue2do

```bash
npm i vue2do -g
```

### 命令行

#### 初始化应用项目

* projectName: 项目名字

```bash
vue2do init project [projectName]
```

#### 构建应用

* appType: 应用类型，可选 spa 和 mpa
* appName: 应用名字

```bash
cd [projectName] // 初始化的项目应用目录下
vue2do build <appType> [appName]
```

### 例子

#### 在当前目录构建名字为 zenProject 的应用项目

```bash
vue2do init project zenProject
```

#### 在当前应用项目构建 名字为 zenMpa 的多页应用

```bash
cd zenProject
vue2do build mpa zenMpa
```

***

获取更多信息请访问 vue2do 的 [文档网站](https://zen0822.github.io)。

本项目遵循 [semver](http://semver.org/lang/zh-CN/) 版本管理