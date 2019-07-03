const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function ({
  appName
} = {}) {
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })
  const baseWebpackConfig = require('./base.webpack.conf')({
    appName
  })

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

  let webpackConfig = {
    devtool: config.sw.prodSourceMap ? '#source-map' : false,
    entry: {
      sw: path.resolve(__dirname, `${config.global.root}/${appName}/client/sw/sw.worker.ts`)
    },
    mode: 'production',
    module: {
      rules: configRule
    },
    output: {
      publicPath: config.sw.assetPublicPath,
      path: config.sw.assetRoot,
      filename: '[name].js',
      globalObject: 'this'
    },
    optimization: {
      minimizer: []
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.SW_ENV': JSON.stringify(process.env.SW_ENV)
      }),
      new ForkTsCheckerWebpackPlugin({
        tslint: true,
        async: true,
        watch: [path.resolve(__dirname, `${config.global.root}/example/client/sw`)],
        reportFiles: [path.resolve(__dirname, `${config.global.root}/example/client/sw`)]
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [`${config.sw.assetRoot}/*`],
        verbose: true
      })
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'src': path.resolve(__dirname, `${config.global.root}/src`)
      },
      symlinks: false
    }
  }

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

  return webpackConfig
}
