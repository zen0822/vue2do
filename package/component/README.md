# Vue2do 基础组件

[![npm version](https://badge.fury.io/js/%40vue2do%2Fcomponent.svg)](https://badge.fury.io/js/%40vue2do%2Fcomponent)

**访问 [zen0822.github.io](https://zen0822.github.io) 开始使用 vue2do 组件**

---

- [开始使用](#开始使用)
  - [安装](#安装)
  - [全部加载](#全部加载)
  - [局部加载](#局部加载)
  - [加载指定组件](#加载指定组件)
- [通过 script 标签加载使用](#通过-script-标签加载使用)

---

## Install

```bash
yarn add @vue/composition-api
```

## 加载

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
import Input from '@vue2do/component/module/Input'

Vue.component('Input', Input)
```

## 通过 script 标签加载使用

[从 codepen 预览](https://codepen.io/zen0822/project/editor/DYympR)

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

## 下载 Icon Font

```bash
@vue2do/component set icon dfasdji387983r.js
```
