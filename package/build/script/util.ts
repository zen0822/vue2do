import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

type TOpt = {
  config: any
}

export default function ({
  config
}: TOpt): any {
  return {
    async entryHub(path: string): Promise<any> {
      const fs = await import('fs')

      return fs.readdirSync(path).map((item) => {
        return item.replace('.js', '')
      })
    },

    assetsPath(_path: string): string {
      const staticDir = process.env.NODE_ENV === 'production' ?
        config.prod.staticDir :
        config.dev.staticDir

      return path.posix.join(staticDir, _path)
    },

    cssLoaders(options: any): any {
      options = options || {}

      function generateLoaders(loaders: any): any {
        const sourceLoader = loaders.map(function (loader: any) {
          let extraParamChar

          if (/\?/.test(loader)) {
            loader = loader.replace(/\?/, '-loader?')
            extraParamChar = '&'
          } else {
            loader = loader + '-loader'
            extraParamChar = '?'
          }

          return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
          return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
          return ['vue-style-loader', sourceLoader].join('!')
        }
      }

      return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
      }
    }
  }
}
