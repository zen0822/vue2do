const path = require('path')
const writeFile = require('write')
const chalk = require('chalk')

class FileToDistWebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const {
      dir: releaseDir
    } = this.options

    compiler.hooks.emit.tap('FileToDistWebpackPlugin', (compilation) => {
      const assets = compilation.assets
      let file, data

      Object.keys(assets).forEach((key) => {
        if (key === 'sw.js') {
          file = path.resolve(releaseDir, key)
          data = assets[key].source()

          writeFile(file, data, (err) => {
            if (err) {
              return console.log(err)
            }

            console.log(`\n${chalk.green('@vue2do/file-to-dist-webpack-plugin')}: 写入 ${file} 成功！\n`)
          })
        }
      })
    })
  }
}

module.exports = FileToDistWebpackPlugin
