# vue2do - 基于 vue2 的响应式基础组件

[![Coverage Status](https://coveralls.io/repos/github/zen0822/vue2do/badge.svg)](https://coveralls.io/github/zen0822/vue2do)
[![Build Status](https://travis-ci.org/zen0822/vue2do.svg?branch=master)](https://travis-ci.org/zen0822/vue2do)

[![vue2do](https://nodei.co/npm/vue2do.png)](https://npmjs.org/package/vue2do)

**访问 [zen0822.github.io](https://zen0822.github.io) 开始使用 vue2do**

---

**The below readme is the documentation for the `canary` (prerelease) branch. To view the documentation for the latest stable Next.js version visit [nextjs.org/docs](https://nextjs.org/docs)**

---

- [开始使用](#开始使用)
  - [安装](#安装)
  - [全部加载](#全部加载)
  - [局部加载](#局部加载)
  - [加载指定组件](#加载指定组件)
- [通过 script 标签加载使用](#通过-script-标签加载使用)
- [构建单页应用（spa）和多页应用（mpa）](#构建单页应用（spa）和多页应用（mpa）)
  - [全局安装 vue2do](#全局安装-vue2do)
  - [命令行](#命令行)
    - [初始化应用项目](#初始化应用项目)
    - [构建应用](#构建应用)
  - [例子](#例子)
    - [在当前目录构建名字为 zenProject 的应用项目](#在当前目录构建名字为-zenProject-的应用项目)
    - [在当前应用项目构建名字为 zenMpa 的多页应用](#在当前应用项目构建名字为-zenMpa-的多页应用)
- [.apprc配置解析](#.apprc配置解析)

## 开始使用

### 安装

#### （真心推荐 [yarn](https://yarnpkg.com/zh-Hans/)，npm 经常丢包，要不就用 cnpm）

```shell
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

```shell
npm i vue2do -g
```

### 命令行

#### 初始化应用项目

- projectName: 项目名字

```shell
vue2do init project [projectName]
```

#### 构建应用

- appType: 应用类型，可选 spa 和 mpa
- appName: 应用名字

```shell
cd [projectName] // 初始化的项目应用目录下
vue2do build <appType> [appName]
```

### 例子

#### 在当前目录构建名字为 zenProject 的应用项目

```shell
vue2do init project zenProject
```

#### 在当前应用项目构建 名字为 zenMpa 的多页应用

```shell
cd zenProject
vue2do build mpa zenMpa
```

## .apprc配置解析

- api：dev 环境的 api 的访问域名
- apiProd 环境的 api 的访问域名
- assetRoot：以 .apprc 将文件打包的文件位置，位置相对的文件位置
- assetPublicPath：打包资源的时候添加在前面的公共访问地址
- assetSubDirectory：静态资源存放在 assetRoot 的文件夹位置
- hotPort：dev 环境的访问端口，https 的默认访问端口是 443，http 是 80
- htmlName：打包生成的 index.html 访问地址 记得加上 html 的文件名，不然 404
- https：等同于 webpack 的 https 选项配置
- loaderRule：loader rule
- mockPort：mock 环境的访问端口，默认是 3000
- proxy: webpack 的 dev 服务器的代理配置
- tpl：使用 app 源文件下的 index.html 的模板 html 文件
- type：app 的类型，spa 单页，mpa 多页

---

获取更多信息请访问 vue2do 的 [文档网站](https://zen0822.github.io)。

本项目遵循 [semver](http://semver.org/lang/zh-CN/) 版本管理
