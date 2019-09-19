const path = require('path')
const fs = require('fs')
const writeFile = require('write')
const loaderUtils = require('loader-utils')
const readline = require('readline')
const pluginName = 'build-css4-webpack-plugin'

class BuildCSS4WebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.normalModuleLoader.tap(
        `${pluginName} loader`,
        (loaderContext, module) => {
          if (/\.var\.scss$/.test(module.resource)) {
            let varScssContent = []
            const context = module.context
            const basename = path.basename(context)
            const file = path.resolve(context, `${basename}.scss`)
            const rl = readline.createInterface({
              input: fs.createReadStream(module.resource)
            })

            rl.on('line', (line) => {
              varScssContent.push(`${line}\n`)
            })

            rl.on('close', () => {
              writeFile(file, varScssContent.join(''), (err) => {
                if (err) {
                  return console.log(err)
                }

                console.log(`\n${new Date()}${pluginName}生成 ${file} 成功！\n`)
              })
            })
          }
        }
      )
    })
  }
}

BuildCSS4WebpackPlugin.loader = function (content) {
  return content
}

BuildCSS4WebpackPlugin.build = function ({
  path: source,
  dir: directory
} = {}) {
  const filePath = source
  const directorys = path.dirname(filePath)

  const travel = function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
      var pathname = path.join(dir, file)

      if (fs.statSync(pathname).isDirectory()) {
        return travel(pathname, callback)
      }

      if (path.basename(pathname).includes('.var.scss')) {
        return callback(pathname)
      }
    })
  }

  travel(directorys, (fileName) => {
    let varScssContent = []
    const basename = path.basename(fileName, '.var.scss')
    const dirname = path.dirname(fileName)
    const file = path.resolve(dirname, `${basename}.scss`)
    const rl = readline.createInterface({
      input: fs.createReadStream(fileName)
    })


    rl.on('line', (line) => {
      if (line.includes('$css-vars-use-native')) {
        line = '$css-vars-use-native: false;'
      }

      return varScssContent.push(`${line}\n`)
    })

    rl.on('close', () => {
      writeFile(file, varScssContent.join(''), (err) => {
        if (err) {
          return console.log(err)
        }

        console.log(`生成 ${file} 成功！\r`)
      })
    })
  })
}

module.exports = BuildCSS4WebpackPlugin
