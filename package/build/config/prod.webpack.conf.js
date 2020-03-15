const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
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
    mode: 'production',
    devtool: config.prod.sourceMap,
    output: {
      path: config.prod.outDir,
      publicPath: config.prod.assetPublicPath
    },
    plugin: {
      clean: {
        plugin: CleanWebpackPlugin,
        args: [{
          // dry: true,
          verbose: true
        }]
      },
      html: {
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
      .plugin('compression')
      .use(CompressionWebpackPlugin, [{
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.prod.gzipExt.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }])
  }

  // optimization: {
  //   minimize: true,
  //   minimizer: [{
  //     terser: {
  //       plugin: TerserPlugin,
  //       args: [{
  //         test: /\.js(\?.*)?$/i
  //       }]
  //     }
  //   }]
  // },

  baseWebpackChain
    .optimization
    .minimize(true)
    .minimizer('terser')
    .use(TerserPlugin, [{
      test: /\.m?js(\?.*)?$/i
    }])

  if (typeof projectConfig.webpack === 'function') {
    return projectConfig.webpack(baseWebpackChain)
  }
  return baseWebpackChain
}
