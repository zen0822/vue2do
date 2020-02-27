module.exports = {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './client/asset/img/favicon.ico',
  gzip: true,
  hotPort: 5167,
  htmlName: 'index',
  htmlTitle: 'doc',
  name: 'doc',
  outDir: './dist',
  proxy: {
    '/api/**': `http://localhost:5170`
  },
  staticDir: 'static',
  tpl: true,
  type: 'spa',
  ciExe() {
    // 在持续集成服务器上

    // const websiteProject = './zen0822.github.io'

    // console.log('release')

    // shelljs.rm('-rf', websiteProject)

    // if (shelljs.exec('git clone https://github.com/zen0822/zen0822.github.io.git').code === 0) {
    //   shelljs.echo('Git clone zen0822.github.io success')

    //   shelljs.rm('-rf', `${websiteProject}/static`)
    //   shelljs.cp('-r', `./*`, `${websiteProject}`)
    //   shelljs.echo(`Successfully copy to ${websiteProject}`)
    // } else {
    //   shelljs.echo('Git clone zen0822.github.io failed')
    //   exit(1)
    // }
  },
  webpack(config) {
    // see https://github.com/neutrinojs/webpack-chain for config.
    config.module
      .rule('protocol')
      .test(/blog-[\w\W]+.html$/)
      .use('extract')
      .loader('extract-loader')
      .end()
      .use('html')
      .loader('html-loader')
      .end()
      .use('file')
      .loader('file-loader')
      .options({
        name: 'static/[name].[ext]',
        publicPath: './'
      })
      .end()

    return config
  }
}
