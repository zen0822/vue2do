const path = require('path')
const webpack = require('webpack')
const glob = require('glob-all')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const Config = require('webpack-chain')
const webpackChainConfig = new Config()

module.exports = function ({
  config,
  extractScss = false,
  purgeCss = false,
  bundleAnalyzer = false
} = {}) {
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      presets: [
        require.resolve('@babel/preset-react'),
        require.resolve('@babel/preset-typescript'),
        [require.resolve('@babel/preset-env'), {
          modules: false,
          targets: {
            browsers: ['last 2 versions', 'ie >= 10', 'iOS >= 8']
          }
        }]
      ],
      plugins: [
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-transform-runtime'),
        require.resolve('@babel/plugin-transform-react-jsx-source'),
        // require.resolve('@babel/plugin-transform-arrow-functions'),
        require.resolve('react-hot-loader/babel'),
        [
          require.resolve('babel-plugin-import'),
          {
            'libraryName': 'antd-mobile',
            libraryDirectory: 'es',
            'style': 'css'
          }
        ],
        [
          require.resolve('babel-plugin-import'),
          {
            'libraryName': 'antd',
            libraryDirectory: 'es',
            'style': 'css'
          },
          'some unique name'
        ]
      ]
    }
  }

  const utils = require(path.resolve(__dirname, `../script/util`))({
    config
  })
  const projectConfig = config.project
  const appName = projectConfig.name

  const globalRoot = config.global.root
  const projectPath = projectConfig.path
  let extractTextScss = null

  if (extractScss) {
    extractTextScss = new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash].css')
    })
  }

  const commonRule = {
    include: [
      projectPath,
      /(react-intl|intl-messageformat|intl-messageformat-parser)/,
      /(antd|antd-moboile)/,
      path.resolve(__dirname, '../util'),
      path.resolve(__dirname, '../../component')
    ]
  }

  let entryConfig = {}
  const configRule = {
    'jsx|tsx|pre': {
      ...commonRule,
      test: /\.(j|t)sx?$/,
      enforce: 'pre',
      use: {
        eslint: {
          loader: 'eslint-loader'
        }
      }
    },
    tsx: {
      ...commonRule,
      test: /\.tsx?$/,
      use: {
        babel: babelLoader,
        ts: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            compilerOptions: {
              module: 'es6',
              noEmit: true
            }
          }
        }
      }
    },
    jsx: {
      ...commonRule,
      test: /\.jsx?$/,
      use: {
        babel: babelLoader
      }
    },
    css: {
      ...commonRule,
      include: [
        ...commonRule.include
      ],
      test: /\.(css)$/,
      use: {
        style: {
          loader: extractScss ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        css: {
          loader: 'css-loader'
        },
        postcss: {
          loader: 'postcss-loader'
        }
      }
    },
    scss: {
      ...commonRule,
      test: /\.(scss)$/,
      use: {
        style: {
          loader: extractScss ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        css: {
          loader: 'css-loader'
        },
        postcss: {
          loader: 'postcss-loader'
        },
        sass: {
          loader: 'sass-loader'
        }
      }
    },
    less: {
      ...commonRule,
      test: /\.(less)$/,
      use: {
        style: {
          loader: extractScss ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        css: {
          loader: 'css-loader'
        },
        postcss: {
          loader: 'postcss-loader'
        },
        sass: {
          loader: 'less-loader'
        }
      }
    },
    img: {
      ...commonRule,
      test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
      use: {
        url: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    },
    media: {
      ...commonRule,
      test: /\.(mp3|aac|ogg)(\?.*)?$/,
      use: {
        file: {
          loader: 'file-loader'
        }
      }
    },
    'html|tpl': {
      ...commonRule,
      test: /\.(html|tpl)$/,
      use: {
        file: {
          loader: 'html-loader'
        }
      }
    }
  }

  if (projectConfig.type === 'map') {
    const entryHub = utils.entryHub(path.resolve(projectPath, `./entry`))

    entryHub.forEach((entryName) => {
      entryConfig = {
        ...entryConfig,
        [entryName]: [
          path.resolve(projectPath, `./entry/${entryName}.tsx`)
        ]
      }
    })
  } else {
    entryConfig = {
      ...entryConfig,
      [appName]: [
        path.resolve(projectPath, projectConfig.execute || './index')
      ]
    }
  }

  const baseConf = {
    mode: 'production',
    entry: entryConfig,
    module: {
      rule: configRule
    },
    output: {
      path: config.prod.assetRoot,
      filename: utils.assetsPath('js/[name].bundle.[hash:7].js')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugin: {
      forkTsChecker: {
        plugin: ForkTsCheckerWebpackPlugin,
        args: [{
          eslint: true,
          async: true,
          watch: [projectPath],
          reportFiles: [projectPath]
        }]
      }
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    },

    stats: 'verbose',

    resolve: {
      modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        rootDir: globalRoot,
        libDir: path.resolve(globalRoot, './lib')
      }
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '../node_modules'), 'node_modules']
    }
  }

  webpackChainConfig.merge(baseConf)

  if (config.zepto) {
    webpackChainConfig.module
      .rule('exportZepto')
      .test(require.resolve(path.resolve(globalRoot, './lib/zepto/zepto1.2.0.min.js')))
      .use('exports')
      .loader('exports-loader?window.$!script-loader')

    webpackChainConfig
      .plugin('webpackProvide')
      .use(webpack.ProvidePlugin, [{
        $: require.resolve(path.resolve(__dirname, `${globalRoot}/lib/zepto/zepto1.2.0.min.js`))
      }])
  }

  if (extractScss) {
    webpackChainConfig
      .plugin('extractTextScss')
      .use(extractTextScss)
  }

  if (purgeCss) {
    webpackChainConfig
      .plugin('purgeCss')
      .use(PurgecssPlugin, [{
        paths: () => glob.sync([
          `${projectPath}/**/*`,
          `${path.resolve(__dirname, '../../component')}/**/*`,
          `!${path.resolve(__dirname, '../../component')}/node_modules/**/*`
        ], { nodir: true })
      }])
  }

  if (bundleAnalyzer) {
    webpackChainConfig
      .plugin('bundleAnalyzer')
      .use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        reportFilename: 'webpack-bundle-report.html',
        defaultSizes: 'parsed',
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      }])
  }

  return projectConfig.webpack(webpackChainConfig)
}
