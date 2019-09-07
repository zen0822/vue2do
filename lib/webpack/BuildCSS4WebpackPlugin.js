const path = require('path')
const fs = require('fs')
const writeFile = require('write')
const loaderUtils = require('loader-utils')

const pluginName = 'build-css4-webpack-plugin'

class BuildCSS4WebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const {
      dir: releaseDir
    } = this.options

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.normalModuleLoader.tap(
        `${pluginName} loader`,
        (loaderContext, module) => {
          // if (/\.var\.scss$/.test(module.request)) {
          //   const filepath = module.rawRequest

          //   const childCompiler = compilation.createChildCompiler(
          //     `${pluginName} ${module.request}`,
          //     {
          //       filename: path.basename(filepath, path.extname(filepath)),
          //       publicPath: compilation.outputOptions.publicPath
          //     }
          //   )
          // }
        }
      )
    })
  }
}

BuildCSS4WebpackPlugin.loader = function (content) {
  return content
}

module.exports = BuildCSS4WebpackPlugin
