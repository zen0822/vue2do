const path = require('path')
const utils = require('./../utils')
const webpack = require('webpack')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const version = process.env.VERSION || require('../../package.json').version
const banner =
  '/*!\n' +
  ' * vue2do.js v' + version + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' Zen Huang\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const umdExternals = {
  vue: {
    root: 'Vue',
    commonjs2: 'vue',
    amd: 'vue',
    commonjs: 'vue'
  },
  'vuex': {
    root: 'Vuex',
    commonjs2: 'vuex',
    amd: 'vuex',
    commonjs: 'vuex'
  },
  'vue-i18n': {
    root: 'VueI18n',
    commonjs2: 'vue-i18n',
    amd: 'vue-i18n',
    commonjs: 'vue-i18n'
  }
}

const externals = {
  vue: 'Vue',
  'vuex': 'Vuex',
  'vue-i18n': 'VueI18n'
}

module.exports = function (opt = {}) {
  const appName = opt.appName

  const config = require('../config')
  const appConfig = require(path.resolve(__dirname, `${config.global.root}/${appName}/config.json`))
  const baseWebpackConfig = require('./base.webpack.conf')(opt)

  const extractGridScss = new ExtractTextPlugin({
    filename: `grid${opt.compress ? '.min' : ''}.css`
  })

  var env = process.env.NODE_ENV === 'testing' ?
    require('../config/test.env') :
    config.build.env
  const template = appConfig.template ? '' : path.resolve(__dirname, `../tpl/index.html`)

  delete baseWebpackConfig.entry

  var webpackConfig = merge(baseWebpackConfig, {
    entry: path.resolve(__dirname, `${config.global.root}/index.js`),
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      publicPath: config.build.assetsPublicPath,
      library: 'Vue2do',
      libraryTarget: opt.library,
      filename: opt.filename
    },
    module: {
      rules: [{
        test: /grid\.scss$/,
        use: extractGridScss.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: opt.compress
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }]
    },
    externals: opt.library === 'var' ? externals : umdExternals,
    plugins: [
      extractGridScss,
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      })
    ]
  })

  if (config.build.productionGzip) {
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (opt.compress) {
    webpackConfig.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          output: {
            comments: false,
            beautify: false
          },
          compress: true,
          warnings: false
        }
      })
    )
  }

  return webpackConfig
}
