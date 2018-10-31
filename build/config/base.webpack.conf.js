const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function ({
  appName,
  extractScss = false
} = {}) {
  const path = require('path')
  const config = require(path.resolve(__dirname, `./index`))
  const utils = require(path.resolve(__dirname, `./../utils`))
  const webpack = require('webpack')
  let extractTextScss = null

  if (extractScss) {
    extractTextScss = new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
      allChunks: true,
      disable: false
    })
  }

  const baseConf = {
    entry: {
      app: [
        'babel-polyfill',
        path.resolve(__dirname, `${config.global.root}/${appName}/app.js`)
      ]
    },

    output: {
      publicPath: config.dev.assetsPublicPath,
      path: config.build.assetsRoot,
      filename: '[name].[hash].js'
    },

    stats: 'verbose',

    context: path.resolve(__dirname, 'app'),

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, `${config.global.root}/src/scss`)],
      extensions: ['.js', '.jsx'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vue2do': path.resolve(__dirname, `${config.global.root}`),
        'src': path.resolve(__dirname, `${config.global.root}/src`),
        'ex': path.resolve(__dirname, `${config.global.root}/example`),
        'exAsset': path.resolve(__dirname, `${config.global.root}/example/client/asset`)
      }
    },

    module: {
      rules: [{
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
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        query: {
          configFile: '.eslintrc.js',
          formatter: require('eslint-friendly-formatter')
        },
        exclude: [/node_modules/]
      }, {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
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
      }, {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }]
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    plugins: []
  }

  if (extractScss) {
    baseConf.plugins.push(extractTextScss)
    baseConf.module.rules.push({
      test: /\.(css|scss)$/,
      use: extractTextScss.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }),
      exclude: [/(grid|util)\.scss$/]
    })
  } else {
    baseConf.module.rules.push({
      test: /\.(css|scss)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      exclude: [/(grid|util)\.scss$/]
    })
  }

  return baseConf
}
