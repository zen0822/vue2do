const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  Linter,
  Configuration
} = require('tslint')

module.exports = function ({
  appName,
  extractScss = false
} = {}) {
  const path = require('path')
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })
  const utils = require(path.resolve(__dirname, `./../utils`))({
    appName
  })
  let extractTextScss = null

  // {
  //   const program = Linter.createProgram('tsconfig.json', path.resolve(__dirname, `${config.global.root}/`))
  //   const linter = new Linter({
  //     fix: false,
  //     formatter: 'json'
  //     // rulesDirectory: 'customRules/',
  //     // formattersDirectory: 'customFormatters/'
  //   }, program)

  //   const files = Linter.getFileNames(program)
  //   files.forEach(file => {
  //     const fileContents = program.getSourceFile(file).getFullText()
  //     const configuration = Configuration.findConfiguration(path.resolve(__dirname, `${config.global.root}/tslint.json`), file).results
  //     linter.lint(file, fileContents, configuration)
  //   })

  //   const results = linter.getResult()

  //   console.log(results)

  //   if (results.errorCount === 0) {
  //     // done()
  //   } else {
  //     // throw new gutil.PluginError('tslint', new Error(results.output))
  //   }
  // }

  if (extractScss) {
    extractTextScss = new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
      allChunks: true,
      disable: false
    })
  }

  let configRule = [{
    test: /\.vue$/,
    loader: 'vue',
    query: {
      loaders: utils.cssLoaders()
    }
  }, {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      esModule: true
    }
  }, {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    query: {
      configFile: '.eslintrc.js',
      formatter: require('eslint-friendly-formatter')
    },
    exclude: [/node_modules/]
  }, {
    test: /\.(js|jsx)$/,
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
          appendTsxSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      }
    ]
  }, {
    test: /\.(css|scss)$/,
    use: [
      extractScss ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
    exclude: [/(grid|util)\.scss$/]
  }, {
    test: /\.(tpl)$/,
    loader: 'html-loader'
  }, {
    test: /\.pug$/,
    loader: 'pug-loader'
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
  }]

  if (Array.isArray(config.loaderRule)) {
    configRule = configRule.concat(config.loaderRule)
  }

  const baseConf = {
    mode: 'production',
    entry: {
      app: [
        path.resolve(__dirname, `${config.global.root}/${appName}/app.js`)
      ]
    },

    output: {
      publicPath: config.dev.assetsPublicPath,
      path: config.build.assetsRoot,
      filename: '[name].[hash].js'
    },

    stats: 'verbose',

    context: path.resolve(__dirname, 'app'),

    resolve: {
      modules: ['node_modules', path.resolve(__dirname, `${config.global.root}/src/scss`)],
      extensions: ['.js', '.jsx', 'ts', '.tsx'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vue2do': path.resolve(__dirname, `${config.global.root}`),
        'src': path.resolve(__dirname, `${config.global.root}/src`),
        'ex': path.resolve(__dirname, `${config.global.root}/example`),
        'exAsset': path.resolve(__dirname, `${config.global.root}/example/client/asset`)
      }
    },

    module: {
      rules: configRule
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    plugins: []
  }

  if (extractScss) {
    baseConf.plugins.push(extractTextScss)
  }

  return baseConf
}
