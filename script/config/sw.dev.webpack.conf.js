const path = require('path')
const webpack = require('webpack')
const File2DistWebpackPlugin = require('../../lib/webpack/File2DistWebpackPlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function ({
  appName
} = {}) {
  const config = require(path.resolve(__dirname, `./index`))({
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

  const baseConf = {
    mode: 'development',
    devtool: '#eval-source-map',
    entry: {
      sw: path.resolve(__dirname, `${config.global.root}/${appName}/client/sw/sw.worker.ts`)
    },

    output: {
      publicPath: config.sw.assetPublicPath,
      path: config.sw.assetRoot,
      filename: '[name].js',
      pathinfo: false,
      globalObject: 'this'
    },

    stats: 'verbose',

    context: path.resolve(__dirname, `${config.global.root}`),

    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'src': path.resolve(__dirname, `${config.global.root}/src`)
      },
      symlinks: false
    },

    module: {
      rules: configRule
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tslint: true,
        async: true,
        watch: [path.resolve(__dirname, `${config.global.root}/example/client/sw`)],
        reportFiles: [path.resolve(__dirname, `${config.global.root}/example/client/sw`)]
      }),
      new webpack.HotModuleReplacementPlugin(),
      new File2DistWebpackPlugin({
        dir: config.sw.assetRoot
      })
    ]
  }

  return baseConf
}
