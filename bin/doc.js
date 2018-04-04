#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 --app [string] --push [boolean]')
  .example('$0 --app example', 'Build document website')
  .options({
    'app': {
      alias: 'a',
      describe: 'App name',
      type: 'string'
    },
    'push': {
      alias: 'p',
      describe: 'Push to online website',
      type: 'boolean',
      default: false
    }
  })
  .argv

require('../build/doc')({
  appName: 'example',
  push: argv.push
})
