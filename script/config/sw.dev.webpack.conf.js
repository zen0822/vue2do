const path = require('path')
const webpack = require('webpack')
const FileToDistWebpackPlugin = require('../../lib/webpack/FileToDistWebpackPlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function ({
  appName
} = {}) {
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })

  const configRule = [{
    test: /\.(j|t)sx?$/,
    enforce: 'pre',
    exclude: [/node_modules/],
    loader: 'eslint-loader'
  }, {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader'
    },
    exclude: [/node_modules/]
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

  const baseConf = {
    context: path.resolve(__dirname, `${config.global.root}`),
    devtool: '#eval-source-map',
    entry: {
      sw: path.resolve(__dirname, `${config.global.root}/${appName}/client/sw/sw.worker.ts`)
    },
    mode: 'development',
    module: {
      rules: configRule
    },
    output: {
      publicPath: config.sw.assetPublicPath,
      path: config.sw.assetRoot,
      filename: '[name].js',
      pathinfo: false,
      globalObject: 'this'
    },
    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: true,
        watch: [path.resolve(__dirname, `${config.global.root}/example/client/sw`)],
        reportFiles: [path.resolve(__dirname, `${config.global.root}/example/client/sw`)]
      }),
      new webpack.HotModuleReplacementPlugin(),
      new FileToDistWebpackPlugin({
        dir: config.sw.assetRoot
      })
    ],
    stats: 'verbose',
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'src': path.resolve(__dirname, `${config.global.root}/src`)
      },
      symlinks: false
    }
  }

  return baseConf
}
