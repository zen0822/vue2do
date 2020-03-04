# 模拟数据服务

## Install DB

### Install docker desktop

```bash
docker-compose up -d
```

### Start GraphQL server

You can config gql server port in `mock.config.js`

```js
...
gql: {
  execute: '../../tsDist/app/mock/server/gql/gql.js',
  port: 5168
},
...
```

Start gql

```bash
vue2do-mock gql projectPath/mock.config.js
```
