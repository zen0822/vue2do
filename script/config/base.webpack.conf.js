const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function ({
  appName,
  extractScss = false
} = {}) {
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })
  const utils = require(path.resolve(__dirname, `./../utils`))({
    appName
  })
  let extractTextScss = null

  if (extractScss) {
    extractTextScss = new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
      allChunks: true,
      disable: false
    })
  }

  let configRule = [{
    test: /\.vue$/,
    loader: 'vue',
    query: {
      loaders: utils.cssLoaders()
    }
  }, {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      esModule: true
    }
  }, {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    query: {
      configFile: '.eslintrc.js',
      formatter: require('eslint-friendly-formatter')
    },
    exclude: [/node_modules/]
  }, {
    test: /\.(js|jsx)$/,
    use: {
      loader: 'babel-loader'
    },
    exclude: [/node_modules/]
  }, {
    test: /\.tsx?$/,
    enforce: 'pre',
    exclude: /node_modules/,
    loader: 'tslint-loader',
    options: {
      typeCheck: true
    }
  }, {
    test: /\.tsx?$/,
    exclude: [/node_modules/],
    use: [
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          appendTsxSuffixTo: [/\.vue$/],
          transpileOnly: true,
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  }, {
    test: /\.(css|scss)$/,
    use: [
      extractScss ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
    exclude: [/(grid|util)\.scss$/]
  }, {
    test: /\.(tpl)$/,
    loader: 'html-loader'
  }, {
    test: /\.pug$/,
    loader: 'pug-loader'
  }, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  }, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
  }]

  if (Array.isArray(config.loaderRule)) {
    configRule = configRule.concat(config.loaderRule)
  }

  const baseConf = {
    mode: 'production',
    entry: {
      app: [
        path.resolve(__dirname, `${config.global.root}/${appName}/app.js`)
      ]
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },

    output: {
      publicPath: config.dev.assetPublicPath,
      path: config.build.assetRoot,
      filename: '[name].[hash].js',
      pathinfo: false
    },

    stats: 'verbose',

    context: path.resolve(__dirname, 'app'),

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, `${config.global.root}/src/scss`)],
      extensions: ['.js', '.jsx', 'ts', '.tsx'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vue2do': path.resolve(__dirname, `${config.global.root}`),
        'src': path.resolve(__dirname, `${config.global.root}/src`),
        'ex': path.resolve(__dirname, `${config.global.root}/example`),
        'exAsset': path.resolve(__dirname, `${config.global.root}/example/client/asset`)
      },
      symlinks: false
    },

    module: {
      rules: configRule
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    plugins: []
  }

  if (extractScss) {
    baseConf.plugins.push(extractTextScss)
  }

  return baseConf
}
