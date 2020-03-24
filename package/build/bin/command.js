#!/usr/bin/env node


const path = require('path')
const yargs = require('yargs')

return yargs
  .example('$0 dev ./path/project.config.js --root ./path')
  .example('$0 prod ./path/project.config.js --root ./path')
  .command({
    command: 'dev <path>',
    desc: '@vue2do/build command dev',
    builder(yargs) {
      yargs.options({
        path: {
          demandOption: true,
          describe: 'Configuration path.',
          type: 'string'
        },
        root: {
          alias: 'r',
          demandOption: false,
          describe: 'Project path.',
          type: 'string'
        }
      })
    },
    handler: (argv) => {
      require('../script/dev')({
        projectConfig: {
          root: argv.root ? path.resolve(process.cwd(), argv.root) : undefined
        },
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
        },
        root: {
          alias: 'r',
          demandOption: false,
          describe: 'Project path.',
          type: 'string'
        }
      })
    },
    handler: (argv) => {
      require('../script/prod')({
        projectConfig: {
          root: argv.root ? path.resolve(process.cwd(), argv.root) : undefined
        },
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .help()
  .argv

