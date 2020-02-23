#!/usr/bin/env node

const yargs = require('yargs')
const { setCompIcon } = require('../script/icon')
const { buildTheme } = require('../script/theme')

return yargs
  .example('$0 set icon font_254979_tsr3l7elnh.js')
  .command({
    command: 'theme <type> [path]',
    desc: 'Build a custom theme',
    builder(yargs) {
      yargs.options({
        'type': {
          default: 'build',
          describe: '构建自定义的主题变量',
          type: 'string',
          choices: ['build']
        },
        'path': {
          demandOption: true,
          describe: '变量文件位置',
          type: 'string'
        }
      })
    },
    handler: (argv) => buildTheme(argv.type, argv.path)
  })
  .command({
    command: 'set icon <path>',
    desc: '@vue2do/build command dev',
    builder(yargs) {
      yargs.options({
        path: {
          demandOption: true,
          describe: 'Ali Iconfont symbol JS file name.',
          type: 'string'
        }
      })
    },
    handler: (argv) => setCompIcon(argv.path)
  })
  .help()
  .argv
