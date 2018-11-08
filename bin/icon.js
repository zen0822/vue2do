#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 --name [string]')
  .example('$0 --name alk34l3af.svg.js', 'Update the icon of icon`s component')
  .option('name', {
    demandOption: true,
    describe: 'Ali icon file name',
    type: 'string',
    requiresArg: true
  })
  .argv

require('../script/icon').setCompIcon({
  code: argv.name
})
