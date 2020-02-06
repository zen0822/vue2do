#!/usr/bin/env node

const yargs = require('yargs')
const { setCompIcon } = require('../script/icon')

return yargs
  .command({
    command: 'set icon <path>',
    desc: '@act2do/build command dev',
    builder(yargs) {
      yargs.options({
        path: {
          demandOption: true,
          describe: 'Iconfont file path.',
          type: 'string'
        }
      })
    },
    handler: (argv) => setCompIcon(argv.path)
  })
  .help()
  .argv

