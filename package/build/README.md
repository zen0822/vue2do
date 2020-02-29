# Overview

## Configuration

### 项目配置文件

在 cli 中一定需要传 path 参数的

```js
apiUrl: '//example.com', // api 的地址
baseUrl: './', // 项目的根路径，默认是 __dirname
bundleAnalyzer: true, // 打包文件的分析
execute: './index.js', // 执行文件路径
favicon: './public/icon-coin.png', // favicon 路径
gzip: true, // 开启 gzip
hotPort: 3000, // 热开发端口
htmlName: 'index', // html 的名字
htmlTitle: 'ex', // html 标题
name: 'example', // 项目名字，打包的文件名
outDir: './dist', // 输出的项目路径
proxy: {
  '/api/**': {
    target: 'https://www.api.com',
    secure: false,
    changeOrigin: true
  }
},
staticDir: 'static', // 静态文件打包路径
tpl: true, // 使用项目自带的 html 模板，默认为 false
type: 'spa', // 项目类型 spa | map
httpsOpt: true | { httpcert: './example.com.cert' }, // webpack 的 https 的配置
webpack(config) {
  // webpack chain config
  // see https://github.com/neutrinojs/webpack-chain for config.
  // 需要返回 config
  return config
}
```

### ProjectConfig 参数

require 引入时可以只传入 `config` 参数，则必须传入 `path`。
如果也传入 `configPath` 了，会和 `config` 合并，且 `config` 的优先级更高

```js

const vue2doBuild = require('@vue2do/build')

vue2doBuild.dev({
  config: {
    httpsOpt: false
  },
  configPath: path.resolve(__dirname, '../project.config.js')
})

vue2doBuild.dev({
  config: {
    httpsOpt: false,
    path: __dirname
  }
})
```

## Webpack Chain

### loader 的基础配置

```js
'jsx|tsx|pre': {
  ...commonRule,
  test: /\.(j|t)sx?$/,
  enforce: 'pre',
  use: {
    eslint: {
      loader: 'eslint-loader'
    }
  }
},
'ts|tsx': {
  ...commonRule,
  test: /\.tsx?$/,
  use: {
    babel: babelLoader,
    ts: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        experimentalWatchApi: true,
        compilerOptions: {
          module: 'es6',
          noEmit: true
        }
      }
    }
  }
},
'js|jsx': {
  ...commonRule,
  test: /\.jsx?$/,
  use: {
    babel: babelLoader
  }
},
css: {
  ...commonRule,
  include: [
    ...commonRule.include
  ],
  test: /\.(css)$/,
  use: {
    style: {
      loader: extractScss ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    css: {
      loader: 'css-loader'
    },
    postcss: {
      loader: 'postcss-loader'
    }
  }
},
scss: {
  ...commonRule,
  test: /\.(scss)$/,
  use: {
    style: {
      loader: extractScss ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    css: {
      loader: 'css-loader'
    },
    postcss: {
      loader: 'postcss-loader'
    },
    sass: {
      loader: 'sass-loader'
    }
  }
},
less: {
  ...commonRule,
  test: /\.(less)$/,
  use: {
    style: {
      loader: extractScss ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    css: {
      loader: 'css-loader'
    },
    postcss: {
      loader: 'postcss-loader'
    },
    sass: {
      loader: 'less-loader'
    }
  }
},
img: {
  ...commonRule,
  test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
  use: {
    url: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
  }
},
media: {
  ...commonRule,
  test: /\.(mp3|aac|ogg)(\?.*)?$/,
  use: {
    file: {
      loader: 'file-loader'
    }
  }
},
'html|tpl': {
  ...commonRule,
  test: /\.(html|tpl)$/,
  use: {
    file: {
      loader: 'html-loader'
    }
  }
}
```

## Started

### Cli

```bash
vue2do-build dev projectPath/project.config.js

vue2do-build prod projectPath/project.config.js
```

### Require

```js
const vue2doBuild = require('@vue2do/build')

vue2doBuild.dev({
  config: {
    httpsOpt: false
  },
  configPath: path.resolve(__dirname, '../project.config.js')
})

vue2doBuild.prod({
  config: {
    httpsOpt: false
  },
  configPath: path.resolve(__dirname, '../project.config.js')
})
```

## Method

### getConfig

return: base dev prod

```js
const configuration = getConfig({
  config: {
    path: path.dirname(projectConfigPath)
  }
})
```
