#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 --app [string] --release [boolean]')
  .example('$0 --app example', 'Build document website')
  .options({
    'app': {
      alias: 'a',
      describe: 'App name',
      type: 'string'
    },
    'release': {
      alias: 'r',
      describe: 'Release to online website',
      type: 'boolean',
      default: false
    }
  })
  .argv

require('../build/doc')({
  appName: 'example',
  release: argv.release
})
