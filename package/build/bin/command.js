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
        projectConfig: {},
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .command({
    command: 'prod <path>',
    desc: '@vue2do/build command prod',
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
      require('../script/prod')({
        projectConfig: {},
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .help()
  .argv

