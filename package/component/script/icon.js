const path = require('path')
const fs = require('fs')
const download = require('download')

module.exports = {
  setCompIcon: function (filePath) {
    download(`https://at.alicdn.com/t/${filePath}.js`).then((data) => {
      fs.writeFileSync(path.resolve(__dirname, `../module/Icon/iconfont.svg.js`), data)

      console.log(`Icon font downloaded success.`)
    })
  }
}
