const path = require('path')
const fs = require('fs')
const download = require('download')

module.exports = {
  setCompIcon: function (opt) {
    download(`https://at.alicdn.com/t/${opt.code}.js`).then((data) => {
      fs.writeFileSync(path.resolve(__dirname, `../src/asset/icon/iconfont.svg.js`), data)

      console.log(`iconfont download success`)
    })
  }
}
