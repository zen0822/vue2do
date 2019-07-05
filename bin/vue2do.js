#!/usr/bin/env node

const yargs = require('yargs')
const {
  buildApp,
  initProject,
  buildTheme
} = require('../script/app')

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
    handler(argv) {
      initProject(argv.name)
    }
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
    handler(argv) {
      buildApp(argv.projectName, argv.name, argv.type)
    }
  })
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
    handler(argv) {
      buildTheme(argv.type, argv.path)
    }
  })
  .help()
  .argv
