#!/usr/bin/env node

const nodeArgv = process.argv
const optimist = require("optimist")

const argv = optimist.argv

require('../build/icon').setCompIcon({
  code: argv.name
})