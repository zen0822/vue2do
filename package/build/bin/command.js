#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')

return yargs
  .command({
    command: 'dev config <path>',
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
    command: 'prod config <path>',
    desc: '@vue2do/build command prod',
    builder(yargs) {
      yargs.options({
        name: {
          default: 'config',
          describe: '配置文件的路径',
          type: 'string',
          choices: ['config']
        },
        path: {
          demandOption: true,
          describe: 'Configuration path.',
          type: 'string'
        }
      })
    },
    handler: (argv) => {
      require('../script/prod')({
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .help()
  .argv

