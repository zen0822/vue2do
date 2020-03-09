const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = function ({
  config
} = {}) {
  const projectConfig = config.project
  const baseWebpackChain = require('./base.webpack.conf')({
    config,
    extractScss: true,
    bundleAnalyzer: projectConfig.bundleAnalyzer
  })
  const template = projectConfig.tpl ?
    path.resolve(projectConfig.path, `./index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  const prodWebpackConf = {
    devtool: config.prod.sourceMap,
    output: {
      path: config.prod.outDir,
      publicPath: config.prod.assetPublicPath
    },
    plugin: {
      CleanWebpackPlugin: {
        plugin: CleanWebpackPlugin,
        args: [{
          // dry: true,
          verbose: true
        }]
      },
      UglifyJsPlugin: {
        plugin: UglifyJsPlugin,
        args: [{
          uglifyOptions: {
            compress: true,
            cache: true,
            ie8: false,
            parallel: true,
            output: {
              comments: false,
              beautify: false
            },
            sourceMap: config.prod.sourceMap,
            warnings: false
          }
        }]
      },
      HtmlWebpackPlugin: {
        plugin: HtmlWebpackPlugin,
        args: [{
          filename: `${projectConfig.htmlName ? projectConfig.htmlName : 'index'}.html`,
          template,
          title: projectConfig.htmlTitle,
          inject: true
        }]
      }
    }
  }

  baseWebpackChain.merge(prodWebpackConf)

  if (config.prod.gzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    baseWebpackChain
      .plugin('CompressionWebpackPlugin')
      .use(CompressionWebpackPlugin, [{
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.prod.gzipExt.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }])
  }

  if (typeof projectConfig.webpack === 'function') {
    return projectConfig.webpack(baseWebpackChain)
  }

  return baseWebpackChain
}
