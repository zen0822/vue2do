#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')

return yargs
  .example('$0 gql ./path/project.config.js --root ./path')
  .example('$0 sw dev ./path/project.config.js --root ./path')
  .command({
    command: 'gql <path>',
    desc: '@vue2do/mock command gql.',
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
      require('../tsDist/script/gql').default({
        projectConfig: {
          path: argv.root ? path.resolve(process.cwd(), argv.root) : undefined
        },
        projectConfigPath: path.resolve(process.cwd(), argv.path)
      })
    }
  })
  .command({
    command: 'sw <opt> [path]',
    desc: '@vue2do/mock command sw dev.',
    builder(yargs) {
      yargs.options({
        opt: {
          demandOption: true,
          describe: 'Operation dev or prod.',
          type: 'string',
          default: 'prod'
        },
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
    handler: (argv) => require('../tsDist/script/sw')[argv.opt]({
      projectConfig: {
        path: argv.root ? path.resolve(process.cwd(), argv.root) : undefined
      },
      projectConfigPath: path.resolve(process.cwd(), argv.path)
    })
  })
  .help()
  .argv
