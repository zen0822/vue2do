#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')

// const nodemon = require('nodemon')

// nodemon({
//   script: 'app.js',
//   ext: 'js json'
// })

// nodemon.on('start', function () {
//   console.log('App has started')
// }).on('quit', function () {
//   console.log('App has quit')
//   process.exit()
// }).on('restart', function (files) {
//   console.log('App restarted due to: ', files)
// })
return yargs
  .command({
    command: 'dev config <path>',
    desc: '@act2do/build command dev',
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
    desc: '@act2do/build command prod',
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

