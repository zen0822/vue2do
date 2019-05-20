const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
  'vue': 'Vue',
  'vuex': 'Vuex',
  'vue-i18n': 'VueI18n'
}

module.exports = function (opt = {}) {
  const appName = opt.appName

  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })
  const baseWebpackConfig = require('./base.webpack.conf')({
    appName
  })

  delete baseWebpackConfig.entry

  var webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    entry: path.resolve(__dirname, `${config.global.root}/index.js`),
    devtool: config.sw.sourceMap ? '#source-map' : false,
    output: {
      path: config.assetRoot,
      publicPath: config.assetPublicPath,
      library: 'Vue2do',
      libraryTarget: opt.library,
      filename: opt.filename
    },
    module: {
      rules: [{
        test: /(grid|util)\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: opt.compress
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }]
    },
    optimization: {
      minimizer: []
    },
    plugins: []
  })

  if (config.gzip) {
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.gzipExt.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (opt.compress) {
    webpackConfig.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          cache: true,
          ie8: false,
          parallel: true,
          output: {
            comments: false,
            beautify: false
          },
          sourceMap: false,
          warnings: false
        }
      })
    )
  }

  return webpackConfig
}
