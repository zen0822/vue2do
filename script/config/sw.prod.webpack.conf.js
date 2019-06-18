const path = require('path')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function (opt = {}) {
  const appName = opt.appName

  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })
  const baseWebpackConfig = require('./base.webpack.conf')({
    appName
  })
  const globalRoot = config.global.root
  const swPath = path.resolve(__dirname, `${globalRoot}/${appName}/client/sw/sw.worker.ts`)

  let configRule = [{
    test: /\.jsx?$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    query: {
      configFile: '.eslintrc.js',
      formatter: require('eslint-friendly-formatter')
    },
    exclude: [/node_modules/]
  }, {
    test: /\.jsx?$/,
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
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  }]

  delete baseWebpackConfig.entry
  delete baseWebpackConfig.optimization

  let webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    entry: swPath,
    devtool: config.sw.prodSourceMap ? '#source-map' : false,
    output: {
      publicPath: config.sw.assetPublicPath,
      path: config.sw.assetRoot,
      filename: '[name].js',
      globalObject: 'this'
    },
    module: {
      rules: configRule
    },
    optimization: {
      minimizer: []
    },
    plugins: [
      new CleanWebpackPlugin([`${config.sw.assetRoot}/*`], {
        root: path.resolve(__dirname, `${globalRoot}/${appName}/dist`),
        verbose: true
      })
    ]
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
