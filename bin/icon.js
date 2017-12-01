#!/usr/bin/env node

const nodeArgv = process.argv
const optimist = require('optimist')

const argv = optimist.argv

if (!argv.name) {
  console.log('name must be alive!')

  process.exit()
}

require('../build/icon').setCompIcon({
  code: argv.name
})
