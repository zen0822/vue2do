# Mock server

## GraphQL Server

### Configuration

```js
...
gql: {
  execute: '../../tsDist/app/mock/server/gql/gql.js', // 启动文件路径
  port: 5168
}
...
```

### Start

Cli:

```bash
vue2do-mock gql projectPath/mock.config.js
```

Require:

```js
const vue2doMock = require('@vue2do/mock')

vue2doMock.gql({
  configPath: path.resolve(__dirname, '../mock.config.js')
})
```
