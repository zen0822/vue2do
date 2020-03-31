import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import path from 'path'
import getBaseConfig from './base.webpack.conf'

type TOpt = {
  config: any
}

export default async function ({
  config
}: TOpt): Promise<any> {
  const projectConfig = config.project
  const pureJs = projectConfig.pure
  const baseWebpackChain = getBaseConfig({
    config,
    extractScss: true,
    bundleAnalyzer: projectConfig.bundleAnalyzer
  })

  const template = projectConfig.tpl ?
    path.resolve(projectConfig.root, `./index.html`) :
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
      }
    }
  }

  baseWebpackChain.merge(prodWebpackConf)

  if (config.prod.gzip) {
    const CompressionWebpackPlugin = await import('compression-webpack-plugin')

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

  baseWebpackChain
    .optimization
    .minimize(true)
    .minimizer('terser')
    .use(TerserPlugin, [{
      test: /\.m?js(\?.*)?$/i
    }])

  if (!pureJs) {
    baseWebpackChain
      .plugin('html')
      .use(HtmlWebpackPlugin, [{
        filename: `${projectConfig.htmlName ? projectConfig.htmlName : 'index'}.html`,
        template,
        title: projectConfig.htmlTitle,
        inject: true,
        favicon: projectConfig.favicon && path.resolve(projectConfig.root, projectConfig.favicon)
      }])
  }

  if (typeof projectConfig.webpack === 'function') {
    return projectConfig.webpack(baseWebpackChain)
  }

  return baseWebpackChain
}
