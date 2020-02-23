#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const {
  buildApp,
  initProject
} = require('../script/app')

const { build: buildCSS4 } = require('../lib/webpack/BuildCSS4WebpackPlugin')

return yargs
  .command({
    command: 'init <type> [name]',
    desc: 'initialize a project',
    builder(yargs) {
      yargs.options({
        'type': {
          default: 'project',
          describe: 'Init project',
          type: 'string',
          choices: ['project']
        },
        'name': {
          demandOption: true,
          describe: 'Project name',
          type: 'string'
        }
      })
    },
    handler: (argv) => initProject(argv.name)
  })
  .command({
    command: 'build <type> [name]',
    desc: 'Build a single page application',
    builder(yargs) {
      yargs.options({
        'type': {
          default: 'spa',
          describe: 'Application type',
          type: 'string',
          choices: ['spa', 'mpa']
        },
        'name': {
          demandOption: true,
          describe: 'Application name',
          type: 'string'
        },
        'projectName': {
          describe: 'Project name',
          type: 'string'
        }
      })
    },
    handler: (argv) => buildApp(argv.projectName, argv.name, argv.type)
  })
  .command({
    command: 'css4 <type> [path]',
    desc: 'Rebuild ali icon.',
    builder(yargs) {
      yargs
        .example('$0 $1 src/component')
        .options({
          'type': {
            default: 'build',
            describe: '构建不兼容 CSS4 变量的 Sass 文件',
            type: 'string',
            choices: ['build']
          },
          'path': {
            demandOption: true,
            describe: 'scss 文件的位置',
            type: 'string',
            required: true
          }
        })
    },
    handler: (argv) => buildCSS4({ path: path.resolve(argv.path) })
  })
  .help()
  .argv
