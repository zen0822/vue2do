#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')

return yargs
  .command({
    command: 'unit <path>',
    desc: '@vue2do/test command unit',
    builder(yargs) {
      yargs.options({
        path: {
          demandOption: true,
          describe: 'Configuration path.',
          type: 'string'
        }
      })
    },
    handler: (argv) => {
      require('../tsDist/script/unit').default({
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .help()
  .argv

