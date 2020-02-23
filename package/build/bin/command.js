#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')

return yargs
  .example('$0 dev path/project.config.js')
  .example('$0 prod path/project.config.js')
  .command({
    command: 'dev <path>',
    desc: '@vue2do/build command dev',
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
      require('../script/dev')({
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .command({
    command: 'prod <path> [execute]',
    desc: '@vue2do/build command prod',
    builder(yargs) {
      yargs.options({
        path: {
          demandOption: true,
          describe: 'Configuration path.',
          type: 'string'
        },
        execute: {
          default: '',
          describe: 'Execute function name.',
          type: 'string'
        }
      })
    },
    handler: (argv) => {
      require('../script/prod')({
        projectConfigPath: path.resolve(process.cwd(), argv.path),
        executeFunctionName: argv.execute
      })
    }
  })
  .help()
  .argv

