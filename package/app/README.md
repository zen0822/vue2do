# App 构建工具

[![npm version](https://badge.fury.io/js/%40vue2do%2Fapp.svg)](https://badge.fury.io/js/%40vue2do%2Fapp)

---

- [构建单页应用（spa）和多页应用（mpa）](#构建单页应用（spa）和多页应用（mpa）)
  - [全局安装 vue2do](#全局安装-vue2do)
  - [命令行](#命令行)
    - [初始化应用项目](#初始化应用项目)
    - [构建应用](#构建应用)
  - [例子](#例子)
    - [在当前目录构建名字为 zenProject 的应用项目](#在当前目录构建名字为-zenProject-的应用项目)
    - [在当前应用项目构建名字为 zenMpa 的多页应用](#在当前应用项目构建名字为-zenMpa-的多页应用)
- [app.config配置解析](#app.config配置解析)

---

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

## app.config配置解析

- api：dev 环境的 api 的访问域名
- apiProd 环境的 api 的访问域名
- assetRoot：以 app.config 将文件打包的文件位置，位置相对的文件位置
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
