#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')

return yargs
  .example('$0 gql path/project.config.js')
  .example('$0 sw dev path/project.config.js')
  .command({
    command: 'gql <path>',
    desc: '@vue2do/mock command gql.',
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
      require('../tsDist/script/gql').default({
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .command({
    command: 'sw dev <path>',
    desc: '@vue2do/mock command sw dev.',
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
      require('../tsDist/script/sw').dev({
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .help()
  .argv
