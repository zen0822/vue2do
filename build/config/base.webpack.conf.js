const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (opt) {
  var path = require('path')
  var config = require(path.resolve(__dirname, `./index`))
  var utils = require(path.resolve(__dirname, `./../utils`))
  var webpack = require('webpack')

  var appName = opt.appName

  var baseConf = {
    entry: {
      app: path.resolve(__dirname, `${config.global.root}/${appName}/app.js`),
      vendors: ['jquery']
    },

    output: {
      path: config.build.assetsRoot,
      publicPath: opt.env === 'prod' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
      filename: '[name].[hash].js'
    },

    stats: 'verbose',

    context: path.resolve(__dirname, 'app'),

    resolve: {
      modules: ["node_modules", path.resolve(__dirname, `${config.global.root}/scss`)],
      extensions: ['.js'],
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        'vue2': path.resolve(__dirname, `${config.global.root}`),
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue',
          query: {
            loaders: utils.cssLoaders()
          }
        }, {
          enforce: 'pre',
          test: /\.js$/,
          loader: "eslint-loader",
          query: {
            configFile: '.eslintrc.js',
            formatter: require('eslint-friendly-formatter')
          },
          exclude: [/node_modules/]
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.(html|tpl)$/,
          loader: 'html-loader'
        }, {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
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
        }
      ]
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
  }

  return baseConf
}
